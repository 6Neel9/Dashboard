import { world_map } from './world_map';
import { uncountries } from './data'
import * as React from "react";
import { MapsComponent, LayersDirective, LayerDirective, Inject, Legend } from '@syncfusion/ej2-react-maps';
import '../../Styles.scss'

export function ColoredMap() {
    return(
        <div className="container mediumContainer smallMargin mediumPadding mainShadow" style={{width:"98%"}}>
    <MapsComponent  legendSettings={ { visible: true } } >
            <Inject services={[Legend]} />
                <LayersDirective>
                    <LayerDirective shapeData={world_map} shapeDataPath='Country' shapePropertyPath='name' dataSource={uncountries}
                        shapeSettings={ {
                            colorValuePath: 'Membership',
                            colorMapping: [
                                {
                                    value: 'Permanent', color: '#2C1F39'
                                },
                                {
                                    value: 'Non-Permanent', color: '#FFE175'
                                }]
                        } }>
                    </LayerDirective>
                </LayersDirective>
            </MapsComponent>
            </div>
);
}

