/* parameters for calculations*/
const top_width=parseInt(document.getElementById('top_width').value);
const reservoir_width=parseInt(document.getElementById('reservoir_width').value);
const upper_side_width= parseInt(document.getElementById('upper_side_width').value);
const lower_side_width=parseInt(document.getElementById('lower_side_width').value);
const slope= parseInt(document.getElementById('slope').value);
const tail_water_width= parseInt(document.getElementById('tail_water_width').value);
const bottom_small_width=parseInt(document.getElementById('bottom_small_width').value);
const bottom_width= parseInt(document.getElementById('bottom_width').value);

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

const wt_lever_val = [w1_lever_arm(bottom_small_width,bottom_width) ,w2_lever_arm(bottom_width,top_width),w3_lever_arm(bottom_width,top_width)]

const lever_listContainer = document.getElementById("wt-lever-arm-items");

const wt_moment = multiplyArrays(wt_val,wt_lever_val);

const moment_listContainer = document.getElementById("wt-moment-items");

const calcButton = document.getElementById('button-64');

// to display all wt calc
calcButton.addEventListener('click',()=>{

    lever_listContainer.textContent = '';
    wt_listContainer.textContent = '' ;
    moment_listContainer.textContent = '';

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

})

