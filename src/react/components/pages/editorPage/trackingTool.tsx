import React from "react";
import _ from "lodash";
import { AssetService } from "../../../../services/assetService";
import ProjectService from "../../../../services/projectService";
import { IAssetMetadata,IProject } from "../../../../models/applicationState";
import "./editorToolbar.scss";

export interface ITrackingProps{
    project: IProject
    metadata: IAssetMetadata
}


/**
 * @name - Tracking Time Tool
 * @description - For user to enter the time and let them to decide how many seconds to track 
 */
export class TrackingTool extends React.Component <ITrackingProps>{
    
    public state = {
        trackingTime : 0,
        fps:0,
        bbox_calibration:true,
        strength:0
    };
    trackTimeProp: number;
    assetService = new AssetService(this.props.project);
    projectService = new ProjectService();

    inputTrackingbox = {
        marginLeft:'10px',
    };
    inputStyle = {
        margin:'5px',
        width: '50px',
        borderRadius:5
    };
    selectStyle = {
        margin:'5px',
        width: '80px',
        borderRadius:5
    };
    buttonStyle = {
        background: 'linear-gradient(#91919e,#8c8c8c)',
        borderRadius: '5px',
        fontFamily: 'Trebuchet MS',
        borderColor: 'transparent',
    };
    checkboxStyle = {
        marginLeft:'10px',
        width: '15px',
    };
    public render() {
        return (
            <div style={this.inputTrackingbox} >
                {/* Tracking Time */}
                <p style={{display:'inline-block'}}>Tracking Time:</p>
                <input 
                    type="text" 
                    style={this.inputStyle}
                    value={this.state.trackingTime}
                    onChange={e => this.setState({ trackingTime: e.target.value })}/>
                {/* FPS */}
                <p style={{display:'inline-block',marginLeft:'10px'}}>FPS:</p>
                <select style={this.selectStyle} value={this.state.fps} onChange={e => this.setState({ fps: e.target.value })}>
                    <option value="org">Org_FPS</option>
                    <option value="15">15 FPS</option>
                    <option value="6">6 FPS</option>
                    <option value="5">5 FPS</option>
                </select>
                {/* bbox_calibration */}
                <div style={{display:'inline-block',marginRight:'10px'}}>
                    <input type="checkbox" style={this.checkboxStyle} defaultChecked={true} onChange={e => this.setState({ bbox_calibration: e.target.checked })}/> bbox_calibration
                    
                    {/* ↓ 是if判斷寫法 若有勾選bbox_calibration 則會出現強中弱選項 */}
                    {this.state.bbox_calibration == true &&
                        <select style={this.selectStyle} value={this.state.strength} onChange={e => this.setState({ strength: e.target.value })}>strength
                            <option value="0">weak</option>
                            <option value="1">medium</option>
                            <option value="2">strong</option>
                        </select>
                    }
                </div>
                <button style={this.buttonStyle} onClick={this.sendTime} >Auto Track</button>
            </div>
        );
    }

    private showstrength = (event) => {

    }

    private  sendTime = (event) => {
        this.setState({trackingTime: event.target.value});
        console.error(this.props.metadata);
        console.log(this.state.fps);
        this.assetService.getTrackTime(this.state.trackingTime.toString(), this.state.fps.toString(), this.state.bbox_calibration, this.props.metadata, this.state.strength);
		this.projectService.saveTargetPath(this.props.project);
        console.warn("Tracking Time Tool: "  + this.state.trackingTime);
        this.state.trackingTime = 0;
    }
}
