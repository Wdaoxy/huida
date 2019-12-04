import axios from 'axios';

export default async function(url){
    let res = await axios.get(url);
    const {errno, data} = res.data;
    if(errno === 0){
        //没错
        return data;
    }else{
        console.log('有错');
    }
}