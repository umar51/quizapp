


//const webpush = require('web-push');
export const swDev = () => {
  

    // //generating decoded app server key 
    // function determineAppServerKey() {
    //         var vapidKey = webpush.generateVAPIDKeys();
    //         var vapidPublicKey = vapidKey.publicKey;
            
            
          
    //         return urlBase64ToUint8Array(vapidPublicKey)
    //     }
       
    

    // //push message decoding and encoding
    // function urlBase64ToUint8Array(base64String) {
    //         const padding = '='.repeat((4 - base64String.length % 4) % 4);
    //         const base64 = (base64String + padding)
    //         .replace(/-/g, '+')
    //         .replace(/_/g, '/');
        
    //         const rawData = window.atob(base64);
    //         const outputArray = new Uint8Array(rawData.length);
        
    //         for (let i = 0; i < rawData.length; ++i) {
    //         outputArray[i] = rawData.charCodeAt(i);
    //         }
    //         return outputArray;
    //    }





    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl).then((response)=> {
        console.log("sw registered")

        // //subcribed for enabling push messaging
        // return response.pushManager.subscribe({
        //     userVisibleOnly: true,
        //     applicationServerKey: determineAppServerKey()
        // })
    
    })
}
