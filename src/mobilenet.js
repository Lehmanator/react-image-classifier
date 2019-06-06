/**
 * @class       : mobilenet
 * @author      : Sam Lehman (samlehman617@gmail.com)
 * @created     : Tuesday May 21, 2019 19:00:27 EDT
 * @description : mobilenet
 */
import * as tf from '@tensorflow/tfjs';
// import * as tfn from '@tensorflow/tfjs-node';
import { IMAGENET_CLASSES } from './imagenet_classes';

const GOOGLE_CLOUD_STORAGE_DIR = 'https://storage.googleapis.com/tfjs-models/savedmodel/';
const MODEL_FILE_URL = 'mobilenet_v2_1.0_224/model.json';
const INPUT_NODE_NAME = 'images';
const OUTPUT_NODE_NAME = 'module_apply_default/MobilenetV2/Logits/output';
const PREPROCESS_DIVISOR = tf.scalar(255 / 2);
// const MODEL_URL = 'https://raw.githubusercontent.com/samlehman617/react-nsfw-detector/master/model/model.json';
const MODEL_URL = 'https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2';
export class MobileNet {
  constructor() {}

  async load(url = MODEL_URL) {
    console.log('MobileNet[0]: Loading model from', url, '...');
    this.model = await tf.loadGraphModel(url, {fromTFHub: true});
    // this.model = await tf.browser.loadGraphModel(url);
    // const handler = tfn.io.fileSystem('../model/model.json');
    // this.model = await tf.loadGraphModel(url);
    // this.model = await tf.loadGraphModel(url);
  }
    dispose() {
        if (this.model) {
            this.model.dispose();
        }
    }
    predict(input) {
    // let offset = tf.scalar(127.5);
      // .resizeNearestNeighbor([224, 224])
      // .toFloat()
      // .sub(offset)
      // .div(offset)
      // .expandDims();
        console.log('Preprocessing input...');
        const preprocessedInput = tf.div(
            tf.sub(input.asType('float32'), PREPROCESS_DIVISOR),
            PREPROCESS_DIVISOR,
        );
        console.log('Reshaping input...');
        const reshapedInput = preprocessedInput.reshape(
            [1, ...preprocessedInput.shape]
        );
        console.log('Executing...');
        return this.model.execute(
            { [INPUT_NODE_NAME]: reshapedInput }, OUTPUT_NODE_NAME,
        );
    }

    getTopKClasses(logits, topK) {
        const predictions = tf.tidy(() => tf.softmax(logits));
        const values = predictions.dataSync();
        predictions.dispose();
        let predictionList = [];
        for (let i = 0; i < values.length; i++) {
            predictionList.push({ value: values[i], index: i });
        }
        predictionList = predictionList.sort((a, b) => (b.value - a.value).slice(0, topK));
        return predictionList.map(x => ({ label: IMAGENET_CLASSES[x.index], value: x.value }));
    }
}
