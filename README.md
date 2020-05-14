<h1 align="center">
  <br>
  <a href="https://samlehman.me/react-image-classifier"><img src="https://raw.githubusercontent.com/samlehman617/react-image-classifier/master/logo.png" alt="react-image-classifier" width="200"></a>
  <br>
  React Image Classifier
  <br>
</h1>

<h4 align="center">
  A minimal GUI to run images through the <a href="https://tensorflow.org" target="_blank">Tensorflow</a> model <a href="https://ai.googleblog.com/2017/06/mobilenets-open-source-models-for.html" target="_blank">MobileNetV2</a> to classify them.
</h4>

<p align="center">
  <a href="https://saythanks.io/to/publicSamLehman">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://www.paypal.me/publicSamLehman">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#installation">Installation</a> •
  <a href="#to-do">To-Do</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>
<h1 align="center">
  <a href="https://raw.githubusercontent.com/samlehman617/react-image-classifier/master/demo.gif">
    <img 
      src="https://raw.githubusercontent.com/samlehman617/react-image-classifier/master/demo.gif" 
      alt="demo" 
      width="350" />
  </a>
</h1>



## Key Features
- Classifies images using the state-of-the-art MobileNetV2 model.
- Self-hosted & offline.
- Free to use


## Installation
 - Clone or download the repo.
 
   ```git clone https://github.com/samlehman617/react-image-classifier.git ```
 -  Navigate to cloned folder and run 
 
    `npm install`
## Usage
 - Start development server - build app continuously @ `http://localhost:8080`
 
   `npm run start`
 - Pre-build  - `dist/` - Build app for production
 
   `npm run prebuild`

- Build - Build app once and serve @ `http://localhost:3000`

  `npm run build`

## Contribute

Please contribute to the project if you know how to make it better, including this README :)

## To-Do

[  ] Split code into re-usable component

[  ] Allow arbitrary Tensorflow image classifiers

[  ] Add UI for switching between pre-defined/pre-trained models

[__] Make into a Progressive Web App

## Credits
[react-dropzone](https://github.com/react-dropzone/react-dropzone)

## License
Use at your own risk until I decide to learn more about licensing.
