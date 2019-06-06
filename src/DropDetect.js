/**
 * @class       : ImageNet
 * @author      : Sam Lehman (samlehman617@gmail.com)
 * @created     : Tuesday May 21, 2019 17:49:48 EDT
 * @description : ImageNet
 */
import React, { Component, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dropzone, { useDropzone } from 'react-dropzone';
import { MobileNet } from './mobilenet';
import FileCard from './FileCard';

const ASSETS_URL = `${window.location.origin}/assets`;
const MODEL_URL = `${ASSETS_URL}/model/tensorflowjs_model.pb`;
const WEIGHTS_URL = `${ASSETS_URL}/model/weights_manifest.json`;
const IMAGE_SIZE = 128;

// const MODEL_URL = 'https://raw.githubusercontent.com/samlehman617/react-nsfw-detector/master/model/model.json';
const dropzoneStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    padding: '20px',
    margin: '0 auto',
    border: '3px dashed black',
    borderRadius: '10px',
    backgroundColor: '#eaeaea',
    fontFamily: 'sans-serif',
    height: '100px',
    cursor: 'pointer',
};

const DropDetect = async (props) => {
    console.time('Loading of model');
    const mobileNet = new MobileNet();
    await mobileNet.load();
    console.timeEnd('Loading of mobel');
    
    const [ files, setFiles ] = useState([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const images = files.map(file => {
        console.log('File:', file);
        return (
            <FileCard 
                mobilenet={mobilenet} 
                name={file.name}
                key={file.name}
                preview={file.preview}
                size={file.size}
            />
        )
    });

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <p style={{ display: 'inline-block', margin: 'auto auto' }}>Drag & drop some files here, or click to select files</p>
            </div>
            <aside>
                {images.length > 0 ? images : 'Nothing yet' }
            </aside>
        </section>
    );
}

DropDetect.propTypes = {
  model_url: PropTypes.string,
  classes: PropTypes.number,
};
DropDetect.defaultProps = {
  model_url: MODEL_URL,
  classes: 5,
};
export default DropDetect;


    // const [ files, setFiles ] = useState([]);
    // const onDrop = useCallback(acceptedFiles => {
    //     console.log(`${acceptedFiles.length} files uploaded.`, acceptedFiles);
    //     const reader = new FileReader();
    //     reader.onabort = () => console.log('file read was aborted.');
    //     reader.onerror = () => console.log('file read has failed.');
    //     reader.onload = () => {
    //         return acceptedFiles => setFiles(acceptedFiles.map(file => Object.assign(file, {
    //             preview: URL.createObjectURL(file)
    //         })));
    //     }
    //     acceptedFiles.forEach(file => reader.readAsBinaryString(file));
    //     return acceptedFiles => setFiles(acceptedFiles.map(file => Object.assign(file, {
    //         preview: URL.createObjectURL(file)
    //     })));
    // }, []);
    // const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //     accept: 'image/*',
    //     onDrop: onDrop
    //     // onDrop: acceptedFiles => {
    //     //     setFiles(acceptedFiles.map(file => Object.assign(file, {
    //     //         preview: URL.createObjectURL(file)
    //     //     })));
    // });
    // const mobilenet = new MobileNet();
    // mobilenet.load();

    // const images = files.map(file => {
    //     console.log('File:', file);
    //     return (
    //         <FileCard 
    //             mobilenet={mobilenet} 
    //             name={file.name}
    //             key={file.name}
    //             preview={file.preview}
    //             size={file.size}
    //         />
    //     )
    // });
    // useEffect(() => () => {
    //     files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);

    //         // <FileCard key={file.name} file={file} mobilenet={mobilenet} />
    // // } else const images =
    // console.log(`Files[${files.length}]:`, files);
    // console.log(`Images[${images.length}]:`, images);
    // return (
    //     <section className="container">
    //         <div {...getRootProps({className: 'dropzone'})} style={dropzoneStyles}>
    //             <input {...getInputProps()} />
    //             <p style={{ display: 'inline-block', margin: 'auto auto' }}>Drag & drop some files here, or click to select files</p>
    //         </div>
    //         <aside>
    //             {images.length > 0 ? images : 'Nothing yet' }
    //         </aside>
    //     </section>
    // );
// }
