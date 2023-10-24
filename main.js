/* parameters for calculations*/
const top_width= document.getElementById('top_width').value;
const reservoir_width= document.getElementById('reservoir_width').value;
const upper_side_width= document.getElementById('upper_side_width').value;
const lower_side_width= document.getElementById('lower_side_width').value;
const slope= document.getElementById('slope').value;
const tail_water_width= document.getElementById('tail_water_width').value;
const bottom_small_width= document.getElementById('bottom_small_width').value;
const bottom_width= document.getElementById('bottom_width').value;


const w1 = (a,b)=>{
    return 0.5 * a * b * 24;
}
const w1_value = w1(bottom_small_width,lower_side_width)



console.log(w1_value);
const w2 = ()=>{
    return top_width*(lower_side_width+upper_side_width+reservoir_width);
}

const w3 = ()=>{
    return  0.5*(bottom_width-top_width)*(bottom_width-top_width)*slope;
}

console.log(w1.value);