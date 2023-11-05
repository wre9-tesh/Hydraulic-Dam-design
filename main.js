/* parameters for calculations*/
const top_width=parseFloat(document.getElementById('top_width').value);
const reservoir_width=parseFloat(document.getElementById('reservoir_width').value);
const upper_side_width= parseFloat(document.getElementById('upper_side_width').value);
const lower_side_width=parseFloat(document.getElementById('lower_side_width').value);
const slope= parseFloat(document.getElementById('slope').value);
const tail_water_depth= parseFloat(document.getElementById('tail_water_width').value);
const bottom_small_width=parseFloat(document.getElementById('bottom_small_width').value);
const bottom_width= parseFloat(document.getElementById('bottom_width').value);

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
const w3 = (a,b,c)=>{
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

const moment_listContainer = document.getElementById("wt-moment-items");

// for water wt

const waterWt_val = [waterWtRect_us,waterWtTriangle_us,waterWtTriangle_ds];

const waterWt = document.getElementById("water-wt");

const waterLeverArm_val =   [water_w1_lever_arm(bottom_small_width,bottom_width),water_w2_lever_arm(bottom_small_width,bottom_width),water_w3_lever_arm(tail_water_depth)]

const waterLever_listContainer = document.getElementById("water-wt-lever-arm");

const waterWt_moment = multiplyArrays(waterWt_val,waterLeverArm_val);

const waterMoment_listContainer = document.getElementById("water-wt-moment")

// for uplift forces

const upliftForce_val = [upliftRect(tail_water_depth,bottom_small_width,bottom_width),upliftTriangle(upper_side_width,lower_side_width,tail_water_depth,bottom_width,bottom_small_width)];

const uplift_listConatiner =  document.getElementById("uplift-forces");

const upliftLever_val = [(bottom_small_width+bottom_width)/2,(2/3)*(bottom_width+bottom_small_width)]

const upLiftLever_listContainer = document.getElementById('uplift-lever-arm');

const uplift_moment = multiplyArrays(upliftForce_val,upliftLever_val);

const upliftMoment_listContainer = document.getElementById('uplift-moment')

// for upward vertical earthquake forces 0.05W

let upwardVerticalEq_val = 0 ;
wt_val.forEach(item =>{
    upwardVerticalEq_val+=item;

})

const earthQuakeVertical = document.getElementById('earthquake-vertical-force');




const calcButton = document.getElementById('button-64');

calcButton.addEventListener('click',()=>{

    lever_listContainer.textContent = '';
    wt_listContainer.textContent = '' ;
    moment_listContainer.textContent = '';
    waterLever_listContainer.textContent = '';
    waterMoment_listContainer.textContent = '';
    uplift_listConatiner.textContent = '';
    upLiftLever_listContainer.textContent ='';
    upliftMoment_listContainer.textContent= '';

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
        upliftList.textContent = item;
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
// eartquake force



})





