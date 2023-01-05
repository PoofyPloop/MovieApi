// @author PoofyPloop

const { default: axios } = require("axios")

// post request 1
const postRequestOne = async () => {
    try {
        const firstPost = await axios.post('http://localhost:3000/api', {
            title: 'The Terminator',
            release_year: '1984',
            time_viewed: '2002-10-05T02:20:45.300'
        });
        console.log(firstPost.data);
    } catch (error) {
        // Handle Error Here
        console.error(error);
    }
};

// post request 2
const postRequestTwo = async () => {
    try {
        const secondPost = await axios.post('http://localhost:3000/api', {
            title: 'The dorpy',
            release_year: '1983',
            time_viewed: '2012-10-05T02:20:45.300'
        });
        console.log(secondPost.data);
    } catch (error) {
        // Handle Error Here
        console.error(error);
    }
};

// get request
async function getData() {
    try {
        const response = await axios.get('http://localhost:3000/api');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Put request
const putRequest = async () => {
    try {
        const resp = await axios.put('http://localhost:3000/api', [{title:"Gladiator", release_year:"2000", time_viewed:"2017-10-03T11:45:56.200"},{title:"Avengers: Infinity War", release_year:"2019",time_viewed:"2019-12-03T15:20:20.200"},{title:"Wonder Woman", release_year:"2017",time_viewed:"2017-06-04T08:45:56.200"},{title: 'The Terminator', release_year: '1984', time_viewed: '2002-10-05T02:20:45.300'}]);
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

// delete item request
const deleteItemRequest = async () => {
    try {
        const resp = await axios.delete('http://localhost:3000/api/1/');
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

// delete request
const deleteRequest = async () => {
    try {
        const resp = await axios.delete('http://localhost:3000/api/');
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

const testOutput = async () => {
    console.log("Test #1");
    await postRequestOne();
    await postRequestTwo();
    await getData();
    console.log("\nTest #2");
    await putRequest();
    await getData();
    await deleteItemRequest();
    await getData();
    await deleteRequest();
    await getData();
};

testOutput();