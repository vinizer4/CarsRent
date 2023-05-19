import React from 'react';
import {IntervalContainer, StepContainer, StepperContainer} from "./styles";
const data:StepType[] = [
    {title:'1',component:<>A</>},
    {title:'2',component:<>B</>},
    {title:'3',component:<>C</>},
    {title:'4',component:<>D</>},
]


function Stepper() {

    const renderizeSteps = () => {
        data.map((d,i)=>
            (i === 0) ? <Step key={'stepper-'+i} title={d.title} icon={d.icon} component={d.component}/>
            : (
                <>
                    <Interval/>
                    <Step key={'stepper-'+i} title={d.title} icon={d.icon} component={d.component}/>
                </>
            ))
        }


    return (
        <StepperContainer>
            <>
                {renderizeSteps}
            </>
        </StepperContainer>
    );
}

function Step({title, icon, component}: StepType) {
    return (
        <StepContainer>
            {icon ? icon : title}
        </StepContainer>
    )
}

function Interval() {
    return (
        <IntervalContainer>
            <hr/>
        </IntervalContainer>
    )
}

type StepType = {
    title: string,
    icon?: any,
    component?: any,
}

export default Stepper;