/**
 * @class       : ImageRecognitionDropzone
 * @author      : Sam Lehman (samlehman617@gmail.com)
 * @created     : Tuesday May 21, 2019 11:07:22 EDT
 * @description : ImageRecognitionDropzone
 */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import * as tf from '@tensorflow/tfjs';
// import { fromPixels } from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import * as m from './model';

async function ImageRecognitionDropzone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      );
    },
  });
  // Load model
  console.log('loading graph model from:', props.model, '...');
  const model = await loadGraphModel(props.model);
  console.log('loaded graph model from:', props.model);

  // console.log('getting element with id:', props.id);
  // const el = document.getElementById(props.id);

  // const res = model.execute(tf.browser.fromPixels(el));
  // console.log('Result:', res);

  function classify(e = 'recognize') {
    console.log('classifying...');
    return model.execute(tf.browser.fromPixels('recognize'));
  }

  const cards = files.map(file => (
    <div key={file.name}>
      <Card>
        <CardImg id="recognize" top width="100%" src={file.preview} />
        <CardBody>
          <CardTitle>{file.name}</CardTitle>
          <CardSubtitle>{file.size}</CardSubtitle>
          <CardText>Classification: </CardText>
        </CardBody>
      </Card>
    </div>
    // <Button onClick={classify} />
  ));

  useEffect(
    () => () => {
      // Avoid memory leaks by revoking data uris
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        {cards}
      </aside>
    </section>
  );
}
ImageRecognitionDropzone.propTypes = {
  callback: PropTypes.func,
  id: PropTypes.string,
  model: PropTypes.string,
};
ImageRecognitionDropzone.defaultProps = {
  id: 'recognize',
  model: '../model/model.json',
};
export default ImageRecognitionDropzone;
