/**
 * @class       : ImageNet
 * @author      : Sam Lehman (samlehman617@gmail.com)
 * @created     : Tuesday May 21, 2019 17:49:48 EDT
 * @description : ImageNet
 */
import React, { Component, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dropzone, { useDropzone } from 'react-dropzone';
import {
    CardColumns, CardDeck,
    Container,
    Jumbotron,
    Spinner,
} from 'reactstrap';
// import { MobileNet } from './mobilenet';
import * as mn from '@tensorflow-models/mobilenet';
import FileCard from './FileCard';

const ASSETS_URL = `${window.location.origin}/assets`;
const MODEL_URL = `${ASSETS_URL}/model/tensorflowjs_model.pb`;
const WEIGHTS_URL = `${ASSETS_URL}/model/weights_manifest.json`;
const IMAGE_SIZE = 128;

import './styles.scss';
// const MODEL_URL = 'https://raw.githubusercontent.com/samlehman617/react-nsfw-detector/master/model/model.json';
const dropzoneStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: '20px',
    margin: '0 auto',
    border: '3px dashed #bebebe',
    borderRadius: '20px',
    backgroundColor: '#343a40',
    fontFamily: 'sans-serif',
    height: '100px',
    cursor: 'pointer',
};
class DropClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            state: "ready",
        }
    }
    onDrop = (f) => {
        this.setState({ files: [], state: 'loading' });
        const fp = f.map(file=>Object.assign(file,{preview:URL.createObjectURL(file)}));
        this.setState({
            files: fp,
            state: 'done',
        });
        console.log('Files dropped:', this.state.files);
    }
    renderFilePreviews() {
        console.log('Rendering Previews');
        return this.state.files.map(f => this.renderFilePreview(f));
    }

    renderFilePreview(file) {
        return (
            <FileCard
                mobilenet={mn.load(2)} 
                name={file.name}
                key={file.name}
                preview={file.preview}
                size={file.size}
            />
        );
    }
    render() {
        // const mobilenet = this.mobileNet;
        var dzStyles = {
            backgroundColor: '#343a40',
            color: '#bebebe',
            borderColor: '#bebebe',
            height: '100%',
            display: 'flex',
            padding: '0',
            margin: '0',
            flexDirection: 'column',
            flexBasis: '100%',
            alignItems: 'center',
            transition: 'all 3s ease-out',
        };
        if (this.state.state === 'done') {
            dzStyles = {
                backgroundColor: '#343a40',
                color: '#bebebe',
                borderColor: '#bebebe',
                display: 'flex',
                padding: '0',
                margin: '0',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 3s ease-out',
            };
        }
        return (
            <Dropzone onDrop={this.onDrop} height="100%">
                {({getRootProps, getInputProps}) => (
                    <section className="container-fluid" style={{ margin: "auto auto", height: "100%" }}>
                        <Jumbotron fluid 
                            style={dzStyles}
                            {...getRootProps({className: 'dropzone'})}    
                        >
                            <Container fluid>
                                <input {...getInputProps()} id='file-input'/>
                                <p className="display-4">Drop files here</p>
                                <p className="lead">Click to select</p>
                            </Container>
                        </Jumbotron>
                        { this.state.state === "loading" && <Spinner color="primary"/> }
                        { this.state.state === "done" && <h4 style={{color: '#bebebe'}}>Files:</h4> }
                        <CardColumns>
                            { this.renderFilePreviews() }
                        </CardColumns>
                    </section>
                )}
            </Dropzone>
        );
    }
}

DropClass.propTypes = {
  model_url: PropTypes.string,
  classes: PropTypes.number,
};
DropClass.defaultProps = {
  model_url: MODEL_URL,
  classes: 5,
};
export default DropClass;
