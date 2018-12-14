# HotSpotsProject
The goal of this app is to inform underclassmen and prospective students about Macalester's campus. The home screen 
shows a map of the important spots on campus. Each spot has a description of what the spot is, and tags that
tell you what students do at these spots. There is a suggestion box where users can suggest their favorite spots to be 
put on the map. Other user's suggestions will go directly on the map, but there is the option to remove them. You can 
like or dislike these spots. 

# Installation
1. Install WebStorm on your computer

      https://www.jetbrains.com/webstorm/
2. Install Node, Cordova, and Ionic

      Node:
        https://nodejs.org/en/
        
      Cordova:
        Android- https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html
        iOS- https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html
       
      Ionic:
        https://ionicframework.com/docs/v1/guide/installation.html
        
3. Download Xcode from the App Store
4. Clone the repository
5. Open WebStorm
6. Checkout From Version Control->Git 

      Paste the link from the repository
      
7. For iOS only, download CocoaPods

      https://cocoapods.org/app
      
      In the WebStorm terminal:
      
        $ sudo gem install cocoapods
        
        $ cd platforms/ios
        
        $ pod install
         
8. Currently, in Xcode, you have to use Legacy Build Systems.
      file->Workspace Settings
          Under shared workspace settings, change the build system to Legacy Build Systems
          
9. To run the app on a apple device from a Mac, plug your device into your computer. Open the HotSpots project in XCode,
   and in the upper left corner of the screen, change the destination to your device. 
   
