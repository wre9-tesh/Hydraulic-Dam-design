/* parameters for calculations for table*/
let top_width = 0 ;
let reservoir_width= 0 ;
let upper_side_width=  0 ;
let lower_side_width= 0 ;
let slope=  0 ;
let tail_water_depth=  0 ;
let bottom_small_width= 0 ;
let bottom_width=  0 ;

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
     top_width=parseFloat(document.getElementById('top_width').value);
     reservoir_width=parseFloat(document.getElementById('reservoir_width').value);
     upper_side_width= parseFloat(document.getElementById('upper_side_width').value);
     lower_side_width=parseFloat(document.getElementById('lower_side_width').value);
     slope= parseFloat(document.getElementById('slope').value);
     tail_water_depth= parseFloat(document.getElementById('tail_water_width').value);
     bottom_small_width=parseFloat(document.getElementById('bottom_small_width').value);
     bottom_width= parseFloat(document.getElementById('bottom_width').value);

function multiplyArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error("Arrays must have the same length for element-wise multiplication.");
    }

    return arr1.map((element, index) => (element * arr2[index]).toFixed(2));
}

/* calculations related to wt of dam*/
const w1 = (a,b)=>{
    return 0.5 * a * b * 24;
}
const w2 = (a,b,c,d)=>{
    return a*(b+c+d)*24;
}
const w3 = (a,b)=>{
    return  0.5*(a-b)*((a-b)*1.428)*24;
}

const wt_val = [w1(bottom_small_width,lower_side_width),w2(top_width,lower_side_width,upper_side_width,reservoir_width),w3(top_width,bottom_width,slope)]

const wt_listContainer = document.getElementById("wt-items");



// lever arm for weights abt toe
const w3_lever_arm = (b,t)=>{       // b bottom width t top width
        return (2/3)*(b-t);
}
const w2_lever_arm = (b,t)=>{       // b bottom width t top width
    return (t/2)+(b-t);
}
const w1_lever_arm = (s,b)=>{       // b bottom width t top width s small bottom width
    return s/3+b;
}

// calc of wt of water of dam

const waterWtRect_us = upper_side_width*bottom_small_width*10;

const waterWtTriangle_us = 0.5* bottom_small_width*lower_side_width*10;

const waterWtTriangle_ds = 0.5* tail_water_depth* (tail_water_depth/slope) *10;


// lever arm for weight of water abt toe
const water_w1_lever_arm = (b,t)=>{       // b bottom small width t bottom width
    return (b/2)+t;
}
const water_w2_lever_arm = (b,t)=>{       // b bottom width t bottom width
    return (2/3*b)+t;
}
const water_w3_lever_arm = (x)=>{       // x tail water width
    const tailWater = x /slope ;
    return tailWater/3;
}

// uplift forces calc
const upliftRect = (t,s,b)=>{
 return - ((t*10*0.6) * (b+s));
}

const upliftTriangle = (u,l,t,b,s)=>{
    const upperWaterPressure = 10 * (u + l);
    const lowerWaterPressure = 10 * t;
    return -(0.6 * (upperWaterPressure - lowerWaterPressure) * 0.5 * (b+s));
}

// constants for changing values in table
// values of wt of dam
const wt_lever_val = [w1_lever_arm(bottom_small_width,bottom_width) ,w2_lever_arm(bottom_width,top_width),w3_lever_arm(bottom_width,top_width)]

const lever_listContainer = document.getElementById("wt-lever-arm-items");

const wt_moment = multiplyArrays(wt_val,wt_lever_val);

const wtMoment = wt_moment.map(item => parseFloat(item));

const moment_listContainer = document.getElementById("wt-moment-items");

// for water wt

const waterWt_val = [waterWtRect_us,waterWtTriangle_us,waterWtTriangle_ds];

const waterWt = document.getElementById("water-wt");

const waterLeverArm_val =   [water_w1_lever_arm(bottom_small_width,bottom_width),water_w2_lever_arm(bottom_small_width,bottom_width),water_w3_lever_arm(tail_water_depth)]

const waterLever_listContainer = document.getElementById("water-wt-lever-arm");

const waterWt_moment = multiplyArrays(waterWt_val,waterLeverArm_val);

const waterWtMoment_val = waterWt_moment.map(item => parseFloat(item));

const waterMoment_listContainer = document.getElementById("water-wt-moment")

// for uplift forces

const upliftForce_val = [upliftRect(tail_water_depth,bottom_small_width,bottom_width),upliftTriangle(upper_side_width,lower_side_width,tail_water_depth,bottom_width,bottom_small_width)];

const uplift_listConatiner =  document.getElementById("uplift-forces");

const upliftLever_val = [(bottom_small_width+bottom_width)/2,(2/3)*(bottom_width+bottom_small_width)]

const upLiftLever_listContainer = document.getElementById('uplift-lever-arm');

const uplift_moment = multiplyArrays(upliftForce_val,upliftLever_val);

const upliftMoment_val = uplift_moment.map(item => parseFloat(item));

const upliftMoment_listContainer = document.getElementById('uplift-moment')

// for upward vertical earthquake forces 0.05W

let upwardVerticalEq_val = 0 ;
wt_val.forEach(item =>{
    upwardVerticalEq_val+=item;

})

upwardVerticalEq_val *= -0.05 ;  //to give -ve value

const earthQuakeVertical_listContainer = document.getElementById('earthquake-vertical-force');

// for upward vertical earthquake moment

let upwardMoment_val = 0;

wtMoment.forEach(item =>{
    upwardMoment_val+=item;

})


upwardMoment_val *= -0.05;



const eqVerticalMoment_listContainer = document.getElementById('eq-vertical-moment');

// horizontalHydroStatic force
const horizontalHydroStatic_heavy = (l,u)=>{
    return  (l+u)*10*(l+u)*0.5;
}

const horizontalHydroStatic_light = (t)=>{
    return t*t*10*0.5;
}

const horizontalHydro_val = [-horizontalHydroStatic_heavy(lower_side_width,upper_side_width),horizontalHydroStatic_light(tail_water_depth)];

const horizontalHydro_listContainer = document.getElementById('hydro-static-force');

// horizontal Hydrostatic lever arm and moment

const horizontalHydrostaticLeverArm= [(lower_side_width+upper_side_width)/3,tail_water_depth/3 ];

const hydroStaticMoment = multiplyArrays(horizontalHydro_val,horizontalHydrostaticLeverArm);

const hydroStaticMoment_val = hydroStaticMoment.map(item => parseFloat(item));

const horizontalHydroLeverArm_listContainer = document.getElementById('hydro-static-lever-arm');

const horizontalHydroMoment_listContainer = document.getElementById('hydro-static-moment');

// calculation of Pe and Me by Zangers formula

let me_val = 0;
let cM =0;
const pe_val = (bottom_small,upper_ht,lower_ht)=>{
    const wall_ht = upper_ht+lower_ht;
    const cm =  0.735 * (Math.atan(wall_ht/bottom_small)/90)*(180/Math.PI);
    cM =cm;
    const ans = 0.726* cm *Math.pow(wall_ht,2);
    me_val = - ans * 0.412 * wall_ht;
    return - ans;
}


const peVal_listContainer = document.getElementById('pe_val');

const meVal_listContainer = document.getElementById('me_val');

// horizontal eq forces

horizontalEqForce_listContainer = document.getElementById('horizontal-eq-force');

// horizontal lever arm

const horizontalEqLeverArm_val = [(lower_side_width/3),(lower_side_width+upper_side_width+reservoir_width)/2,((bottom_width-top_width)*slope)/3];

horizontalEqLeverArm_listContainer = document.getElementById('horizontal-eq-lever-arm');

//  horizontal moment

horizontalEqMoment_listContainer = document.getElementById('horizontal-eq-moment');

const horizontalEqForces_val = wt_val.map(item => -0.1 * item);

const horizontalEqMoment = multiplyArrays(horizontalEqLeverArm_val,horizontalEqForces_val);

const horizontalEqMoment_val = horizontalEqMoment.map(item => parseFloat(item));

    lever_listContainer.textContent = '';
    wt_listContainer.textContent = '' ;
    moment_listContainer.textContent = '';
    waterLever_listContainer.textContent = '';
    waterMoment_listContainer.textContent = '';
    uplift_listConatiner.textContent = '';
    upLiftLever_listContainer.textContent ='';
    upliftMoment_listContainer.textContent= '';
    earthQuakeVertical_listContainer.textContent = '';
    eqVerticalMoment_listContainer.textContent = '';
    horizontalHydroLeverArm_listContainer.textContent ='';
    horizontalHydro_listContainer.textContent = '';
    horizontalHydroMoment_listContainer.textContent= '';
    peVal_listContainer.textContent= '';
    meVal_listContainer.textContent= '';
    horizontalEqForce_listContainer.textContent= '';
    horizontalEqLeverArm_listContainer.textContent= '';
    horizontalEqMoment_listContainer.textContent= '';

    waterWt.textContent = '';

// to display all wt calc

    wt_val.forEach(item => {
        const wtList = document.createElement("li");
        wtList.textContent = item.toFixed(2);
        wt_listContainer.appendChild(wtList);
    });
    wt_lever_val.forEach(item => {
        const leverList = document.createElement("li");
        leverList.textContent = item.toFixed(2);
        lever_listContainer.appendChild(leverList);
    });
    wt_moment.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        moment_listContainer.appendChild(listItem);
    });

// wt Of Water calculations
    waterWt_val.forEach(item => {
        const waterWtList = document.createElement("li");
        waterWtList.textContent = item.toFixed(2);
        waterWt.appendChild(waterWtList);
    });
//     lever arm of water wt
    waterLeverArm_val.forEach(item => {
        const waterLeverArmList = document.createElement("li");
        waterLeverArmList.textContent = item.toFixed(2);
        waterLever_listContainer.appendChild(waterLeverArmList);
    });
//     moment by water wt
    waterWt_moment.forEach(item => {
        const a = document.createElement("li");
        a.textContent = item;
        waterMoment_listContainer.appendChild(a);
    });
// uplift forces
    upliftForce_val.forEach(item => {
        const upliftList = document.createElement("li");
        upliftList.textContent = item.toFixed(2);
        uplift_listConatiner.appendChild(upliftList);
    });
//     uplift lever arm
    upliftLever_val.forEach(item => {
        const upliftLeverList = document.createElement("li");
        upliftLeverList.textContent = item.toFixed(2);
        upLiftLever_listContainer.appendChild(upliftLeverList);
    });
//     uplift moment arm
    uplift_moment.forEach(item => {
        const upliftMomentList = document.createElement("li");
        upliftMomentList.textContent = item;
        upliftMoment_listContainer.appendChild(upliftMomentList);
    });
// earthquake force
       const equakeList = document.createElement("li");
       equakeList.textContent = upwardVerticalEq_val.toFixed(2);
       earthQuakeVertical_listContainer.appendChild(equakeList);

// earthquake moment
        const equakeMomentList = document.createElement('li')
        equakeMomentList.textContent = upwardMoment_val.toFixed(2);
        eqVerticalMoment_listContainer.appendChild(equakeMomentList);
// Hydrostatic force
    horizontalHydro_val.forEach(item => {
        const horizontalHydroList = document.createElement("li");
        horizontalHydroList.textContent = item.toFixed(2);
        horizontalHydro_listContainer.appendChild(horizontalHydroList);
    });
// hydrostatic lever arm
    horizontalHydrostaticLeverArm.forEach(item => {
        const horizontalHydroLeverArmList = document.createElement("li");
        horizontalHydroLeverArmList.textContent = item.toFixed(2);
        horizontalHydroLeverArm_listContainer.appendChild(horizontalHydroLeverArmList);
    });
// hydrostatic moment
    hydroStaticMoment_val.forEach(item => {
        const horizontalHydroMomentList = document.createElement("li");
        horizontalHydroMomentList.textContent = item;
        horizontalHydroMoment_listContainer.appendChild(horizontalHydroMomentList);
    });

// Pe calc
    const peList = document.createElement('li')
    peList.textContent = pe_val(bottom_small_width,upper_side_width,lower_side_width).toFixed(2);
    peVal_listContainer.appendChild(peList);

// Me calc
    const meList = document.createElement('li')
    meList.textContent = me_val.toFixed(2);
    meVal_listContainer.appendChild(meList);

// horizontal eq forces
    wt_val.forEach(item => {
        const horizontalEqForceList = document.createElement("li");
        item *= -0.1
        horizontalEqForceList.textContent = item.toFixed(2);
        horizontalEqForce_listContainer.appendChild(horizontalEqForceList);
    });
//  horizontal eq lever arm
    horizontalEqLeverArm_val.forEach(item => {
        const horizontalEqLeverArmList = document.createElement("li");
        horizontalEqLeverArmList.textContent = (item).toFixed(2);
        horizontalEqLeverArm_listContainer.appendChild(horizontalEqLeverArmList);
    });

//  horizontal eq moment
    horizontalEqMoment_val.forEach(item => {
        const horizontalEqMomentList = document.createElement("li");
        horizontalEqMomentList.textContent = item;
        horizontalEqMoment_listContainer.appendChild(horizontalEqMomentList);
})
//
// })


// parameters for checking safety

const arrSum = (arr) => {
    if (!Array.isArray(arr)) {
        return "Input is not an array";
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}

 let summationVerticalForces = 0 ;

summationVerticalForces += (arrSum(wt_val) + arrSum(waterWt_val) + arrSum(upliftForce_val) + upwardVerticalEq_val );

const summationHorizontalForces = arrSum(horizontalEqForces_val) + pe_val(bottom_small_width,upper_side_width,lower_side_width) + arrSum(horizontalHydro_val);

let summationMoment = 0;

summationMoment += (arrSum(wtMoment)+ arrSum(waterWtMoment_val)+arrSum(upliftMoment_val) + upwardMoment_val +arrSum(hydroStaticMoment_val) + me_val
+ arrSum(horizontalEqMoment_val) );

console.log(arrSum(waterWtMoment_val))

const bottomFullWidth = (bottom_width+bottom_small_width);

const eccentricity = (bottomFullWidth/2) - (summationMoment/summationVerticalForces);

const maxVerticalStress_toe = (summationVerticalForces/bottomFullWidth)*(1+6*eccentricity/bottomFullWidth);

// const minVerticalStress_heel = (summationVerticalForces/bottomFullWidth)*(1-6*eccentricity/bottomFullWidth);  this one is the right one but sk garg if garbage so

const minVerticalStress_heel = -(summationVerticalForces/bottomFullWidth)*0.405;

// principle stress at toe
const sigma =(maxVerticalStress_toe* (1 + Math.pow(0.7,2)))- ( (10 * tail_water_depth) * Math.pow(0.7,2) );

// principle stress at heel
const sigmaN = minVerticalStress_heel*(1 + Math.pow(bottom_small_width/lower_side_width ,2)) - (((lower_side_width+upper_side_width)*10)+cM * (upper_side_width+lower_side_width) )*Math.pow(bottom_small_width/lower_side_width ,2)

// shear stress at toe
const tau_toe = (maxVerticalStress_toe-(10 * tail_water_depth))*0.7;

const tau_heel = -(minVerticalStress_heel-((cM * (upper_side_width+lower_side_width))+(upper_side_width+lower_side_width)*10))*0.1;

// FOS against overturning
const sigmaFosOverturning = -(arrSum(wtMoment)+arrSum(waterWtMoment_val))/(arrSum(upliftMoment_val)+(upwardMoment_val)+arrSum(hydroStaticMoment_val)+me_val+arrSum(horizontalEqMoment_val));

// FOS against sliding
const sigmaFosSliding = Math.abs(0.7* summationVerticalForces/summationHorizontalForces);

//FOS against shear friction factor
const sigmaShearFrictionFactor = Math.abs(( 0.7* summationVerticalForces + bottomFullWidth *1400 )/summationHorizontalForces);

//for safety check html

    const safetyChecks_div = document.getElementById('safety-checks-values')
    safetyChecks_div.textContent = '';

    const safetyHeading = document.createElement('safety-heading');
    safetyHeading.textContent = 'Safety checks';
    safetyHeading.classList.add('safety-heading');
    safetyChecks_div.appendChild(safetyHeading);


    const verticalSum = document.createElement('div');
    verticalSum.classList.add('sum');
    verticalSum.id = 'vertical-sum';
    safetyChecks_div.appendChild(verticalSum);

    const horizontalSum = document.createElement('div');
    horizontalSum.classList.add('sum');
    horizontalSum.id = 'horizontal-sum';
    safetyChecks_div.appendChild(horizontalSum);

    const eccentricity_val = document.createElement('div');
    eccentricity_val.classList.add('sum');
    eccentricity_val.id = 'eccentricity';
    safetyChecks_div.appendChild(eccentricity_val);

    verticalSum.textContent = '\u2211 V = ' + summationVerticalForces.toFixed(2);

    horizontalSum.textContent =  '\u2211 H = ' + summationHorizontalForces.toFixed(2);

    eccentricity_val.textContent = 'e = ' + eccentricity.toFixed(2) ;

    const tension_text = document.querySelector(".tension-development")

    if (bottomFullWidth/6 < eccentricity.toFixed(2)) {
        tension_text.textContent = ' The resultant is nearer the toe and tension is developed at the heel.'
    }

const safetyValues = document.getElementById('safety-check-functions');

    const maxVert = document.createElement('div');
    maxVert.classList.add('max-vertical-stress')

    if (maxVerticalStress_toe.toFixed(2) <= 3000){
        maxVert.textContent = ' Vertical Stress (at toe) = ' + maxVerticalStress_toe.toFixed(2) ;
    }
    else{
        maxVert.textContent = ' Vertical Stress (at toe) = ' + maxVerticalStress_toe.toFixed(2) ;
    }

    safetyValues.appendChild(maxVert);

    const minVert = document.createElement('div');
    minVert.classList.add('min-vertical-stress')
        if (!safetyValues.contains(minVert)) {
            safetyValues.appendChild(minVert);
        }

    if (minVerticalStress_heel.toFixed(2) <= 3000){
        minVert.textContent = ' Vertical Stress (at heel) = ' + minVerticalStress_heel.toFixed(2) ;
    }
    else{
        minVert.textContent = ' Vertical Stress (at heel) = ' + minVerticalStress_heel.toFixed(2) ;
    }

//     principal stresses

    const principalStressToe = document.createElement('div');
    principalStressToe.classList.add('principal-stress-toe')
    safetyValues.appendChild(principalStressToe);

    if (sigma.toFixed(2) <= 3000){
        principalStressToe.textContent = ' principal Stress at Toe = ' + sigma .toFixed(2) ;
    }
    else{
        principalStressToe.textContent = ' principal Stress at Toe = ' + sigma.toFixed(2) ;
    }

    const principalStressHeel = document.createElement('div');
    principalStressHeel.classList.add('principal-stress-heel')
    safetyValues.appendChild(principalStressHeel);


    if (sigmaN.toFixed(2) <= 420){
        principalStressHeel.textContent = ' principal Stress at heel = ' + sigmaN .toFixed(2) ;
    }
    else{
        principalStressHeel.textContent = ' principal Stress at heel = ' + sigmaN.toFixed(2) ;
    }
// FOS checks
// for overturning
    const fosOtCheck = document.getElementById('overturning');
    const fosOverturn = document.createElement('div');
    fosOverturn.classList.add('overturn');
    const fosOverturnStatement = document.createElement('div');
    fosOverturnStatement.classList.add('otStatement')
    fosOverturn.textContent = ' \u2211 M(+) ÷ \u2211 M(-) = ' + sigmaFosOverturning.toFixed(2);
    fosOtCheck.appendChild(fosOverturn);
    fosOtCheck.style.display='block'

    if (sigmaFosOverturning.toFixed(2) <= 1.5){
        fosOverturnStatement.textContent = ' Factor of safety against overturning = ' + sigmaFosOverturning.toFixed(2)+' < 1.5 , Hence Unsafe ' ;
    }
    else{
        fosOverturnStatement.textContent = ' Factor of safety against overturning = ' + sigmaFosOverturning.toFixed(2)+' > 1.5 , Hence Safe ' ;
    }
    fosOtCheck.appendChild(fosOverturnStatement);

//for sliding

    const fosSlidingCheck = document.getElementById('sliding');
    const fosSlide = document.createElement('div');
    fosSlide.classList.add('slide');
    const fosSlidingStatement = document.createElement('div');
    fosSlidingStatement.classList.add('slideStatement')
    fosSlide.textContent = '(\xB5 * \u2211V) ÷ \u2211H = ' + sigmaFosSliding.toFixed(2);
    fosSlidingCheck.appendChild(fosSlide);
    fosSlidingCheck.style.display='block'

    if (sigmaFosSliding.toFixed(2) <= 1.5){
        fosSlidingStatement.textContent = ' Factor of safety against sliding = ' + sigmaFosSliding.toFixed(2)+' < 1 , Hence Unsafe ' ;
    }
    else{
        fosSlidingStatement.textContent = ' Factor of safety against sliding = ' + sigmaFosSliding.toFixed(2)+' > 1 , Hence Safe ' ;
    }
    fosSlidingCheck.appendChild(fosSlidingStatement);


    //for shear friction factor
    const fosSsf = document.getElementById('shear-friction-factor');
    const fosSsf_val = document.createElement('div');
    fosSsf_val.classList.add('ssf');
    const fosSsfStatement = document.createElement('div');
    fosSsfStatement.classList.add('ssfStatement')
    fosSsf_val.textContent = '(\xB5 * \u2211V + B*q) ÷ \u2211H = ' + sigmaShearFrictionFactor.toFixed(2);
    fosSsf.appendChild(fosSsf_val);
    fosSsf.style.display='block'

    if (sigmaFosSliding.toFixed(2) <= 1.5){
        fosSsfStatement.textContent = 'As, Shear friction factor = ' + sigmaShearFrictionFactor.toFixed(2)+' < 3 , Hence Unsafe ' ;
    }
    else{
        fosSsfStatement.textContent = 'As, Shear friction factor = ' + sigmaShearFrictionFactor.toFixed(2)+' > 3 , Hence Safe ' ;
    }
    fosSsf.appendChild(fosSsfStatement);




    document.getElementById("submitButton").disabled = true;

});
