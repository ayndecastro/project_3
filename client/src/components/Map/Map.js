import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap";
import './Map.css'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  
}

class Map extends Component {

    constructor(props) {
      super(props)
      
      
    }
    handleClick(e, code) {
        alert(code)

    }
    

    render () {
  return (
    <div style={styles} onClick={this.props.mapClicked}>
    <VectorMap
    map={"world_mill"}
    backgroundColor="#232F34"
    zoomOnScroll={false}
    containerStyle={{
      width: "100%",
      height: "100vh"
    }}
    onRegionClick={this.handleClick}
    containerClassName="map"
      regionStyle={{
        initial: {
          fill: "#FBC02D",
          "fill-opacity": 1,
          stroke: "none",
          "stroke-width": 1,
          "stroke-opacity": 1
        },
        hover: {
            "fill": "#ffff74",
          "fill-opacity": 1,
          cursor: 'pointer'
        },
        selected: {
          fill: '#ffff74'  //what colour clicked country will be
        },
        selectedHover: {
        }      
      }}
      regionsSelectableOne={true}
      series={{
        regions: [
          {
            // values: mapData,  //this is your data
            scale: ["#146804", "#ff0000"],  //your color game's here
            normalizeFunction: "polynomial"
          }
        ]
      }}
  />
    </div>
  );
    }
}

export default withStyles(styles)(Map);
