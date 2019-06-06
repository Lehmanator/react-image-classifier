/**
 * @class       : FileCard
 * @author      : Sam Lehman (samlehman617@gmail.com)
 * @created     : Sunday Jun 02, 2019 11:53:16 EDT
 * @description : FileCard
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { MobileNet } from './mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as mn from '@tensorflow-models/mobilenet';

import {
    Button, 
    Card, CardFooter, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubtitle, 
    Container, Col, Row,
    ListGroup, ListGroupItem, 
    Spinner,
    Table,
} from 'reactstrap';
const IMG_SIZE = 224;
const TF_SCALAR = IMG_SIZE + 1 / 2;

class FileCard extends Component {
    constructor(props) {
        super(props);
        console.log('FileCard[0]: constructing...', props);
        this.state = { prediction: [], loading: true };
        this.mobilenet = mn;
    }
    componentDidMount() {
        // console.log('FileCard[1]: Mounted.', this.props);
        // this.imgEl = document.getElementById(this.props.name);
        // console.log('FileCard[2a]: Element:',this.imgEl);
        // this.predict();
        const that = this;
        // Waits 2 seconds before classifying. Image needs to be loaded before detecting pixels
        setTimeout(function() {
            that.predict()
        }, 2000);
    }
    getImageData(el=this.imgEl) {
        console.log('FileCard[2]: Getting image data from element of', this.props.name);
        console.log('FileCard[2b]: Done.');
        const pixels = tf.browser.fromPixels(document.getElementById(this.props.name))
            // .resizeNearestNeighbor([IMG_SIZE, IMG_SIZE])
            // .toFloat()
            // .sub(TF_SCALAR)
            // .div(TF_SCALAR)
            // .expandDims();
       return pixels;
    }
    predict(img=this.getImageData(), model=mn, num=this.props.classes) {
        console.log(`Model: ${model}`);
        const that = this;
        const res = model.load(2)
             .then(m => m.classify(img, num))
             .then(y => that.setState({ prediction: y, loading: false }))
             .then(z => console.log(z))
        console.log(`Prediction: ${this.state.prediction}`);
        console.log('Ranking[0]: Getting top', this.props.classes, 'classes...');
    }
    renderPredictions() {
        const loading = '';
        const list = this.state.prediction.map((item, index) => {
            const cat = String(item['className'])[0].toUpperCase()
                      + String(item['className']).slice(1);
            const prob = parseFloat(item['probability']).toFixed(3);
            // <th scope="row">{index+1}</th>
            return (
               <tr key={index+1}>
                   <td class="align-self-start">{cat}</td>
                   <td class="align-self-end">{prob}</td>
               </tr>
            );
        });

        // <th>#</th>
        return this.state.loading ? loading : (
            <CardBody >
                <Table dark borderless responsive hover size="sm">
                    <thead>
                        <tr>
                            <th class="align-self-start">Class</th>
                            <th class="align-self-end">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            </CardBody>
        );
    }
    render() {
        const cardStyle = {
            backgroundColor: '#343a40',
            borderColor: '#343a40',
            borderRadius: '10px',
            width: '227px',
            transition: 'all 2s ease-out',
        };
        return (
            <Card inverse className="imageCard" style={cardStyle}>
                <CardImg top src={this.props.preview} id={this.props.name} />
                { !this.state.loading &&
                    <CardImgOverlay>
                        <CardTitle tag="h5">{this.props.name}</CardTitle>
                        <CardSubtitle >{Math.trunc(this.props.size/1000)} KB</CardSubtitle>
                    </CardImgOverlay>
                }
                { this.state.loading && 
                    <CardImgOverlay className="row justify-content-center align-items-center">
                        <Spinner className="align-self-center" color="primary"/>
                    </CardImgOverlay>
                }
                { this.state.loading &&
                    <CardFooter>
                        <CardTitle tag="h5">{this.props.name}</CardTitle>
                        <CardSubtitle >{Math.trunc(this.props.size/1000)} KB</CardSubtitle>
                    </CardFooter>
                }
                {this.renderPredictions()}
            </Card>
        );
    }
}
FileCard.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    //preview: PropTypes.string,
    //mobilenet: PropTypes.object,
    classes: PropTypes.number,
};
FileCard.defaultProps = {
    // mobilenet: new MobileNet(),
    classes: 4,
};

export default FileCard;
