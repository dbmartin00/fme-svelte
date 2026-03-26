# Introduction to FME and Segment.io Integration

## Ensure FME events are enabled

Check in FME -> Data hub -> Live tail -> Events 

## Create the Segment -> Split integration in FME

Choose user and anonymousId traffic types (make an anonymous if necessary).

Enable track.

Optional: track named pages and screens

Enable as destination.  Copy and save the key.

## Put Segment and Split together in a page

Create a new Segment source and install Segment.io on the HTML page.  You probably have taken this step already.

Now flag the desired feature with the Harness SDK.  There is a considerable amount of documentation to assist.  Use the complete example below as a reference.  Example code
is also available for other SDKs.

This is an example of the HTML page with both Segment and FME Javascript SDK.
The flag uses dynamic config and tracks to Segment on clicks to "20% Off"

```html
<!DOCTYPE html>
<html>

<head>
    <script>
      !function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="<ke>";;analytics.SNIPPET_VERSION="5.2.0";
      analytics.load("<key>");
      analytics.page();
      }}();
    </script>
    <style>
        body {
            color: white;
        }

        div.cta {
            font-family: Impact, Charcoal, sans-serif;
            font-size: 80px;
            color: black;
            text-align: center;
            background-color: #f2f2f2;
            padding-top: 50px;
            padding-bottom: 50px;
        }

        div.discount {
            font-size: 80px;
            color: blue;
            text-align: center;
        }

        div.cta-image {
            text-align: center;
        }

        img {
            width: 100%;
        }
    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.split.io/sdk/split-11.9.1.js"></script>

    <title>Flowers Promo</title>
</head>

<body>

    <script type="text/javascript">
        let user_id = 'placeholder';
        
        console.log('identify!');
        analytics.identify("<id>", {
            name: "Joseph Marlin",
            email: "joe.marlin@foo.io",
            plan: "premium",
            logins: 5
        });        
        analytics.ready(function() {
            console.log('ready!');
            console.log('analytics.user().id()', analytics.user().id());
            console.log('key -> analytics.user().anonymousId()', analytics.user().anonymousId());
            user_id = analytics.user().anonymousId();
            var factory = splitio({
                core: {
                    authorizationKey: '<harness fme client-side sdk key>',
                    key: user_id,
                    labelsEnabled: true,
                    trafficType: 'anonymous'
                },
                scheduler: {
                    featuresRefreshRate: 1,
                    eventsPushRate: 5,
                    segmentsRefreshRate: 1
                },
                streamingEnabled: true,
                debug: true
            });
            const client = factory.client();

            client.on(client.Event.SDK_READY, function() {
                draw(client);
            });

            client.on(client.Event.SDK_UPDATE, function() {
                draw(client);
            })

        })

        function draw(client) {
            console.log('draw!');
            var result = client.getTreatmentWithConfig("<your flag name>");
            console.log('result', result);
            var config = JSON.parse(result.config);
            console.log('config', config);
            document.getElementById("cta-text").innerHTML = config.text;
            document.getElementById("cta-image").src = config.image;
        }

        function clickHandler() {
            console.log("clickHandler!");

            analytics.track("flower_purchase", {
                userAgent: navigator.userAgent,
                plan: "Pro Annual",
                accountType: "Acme",
                total: 50.00,
                identityId: user_id
            });

            
        }
    </script>
    <div id="cta-text" class="cta">Call to Action</div>
    <div class="cta"><img id="cta-image" alt="bulb"/></div>
    <div id="discount-text" class="discount" onclick="clickHandler()" >20% OFF!</div>
</body>

</html>
```

## Create a Segment.io destination

In the Settings screen, supply the API key you created when you first created the integration in FME.

## Test

In FME, open the Data hub and Live tail events.  Clicks should register on FME almost immediately.

## Make sure!

Your Segment source and destination are enabled.

