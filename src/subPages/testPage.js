const test = function() { 
    const testDiv = document.createElement('div');
    testDiv.innerText = "ROLODEX TEST!";
    testDiv.classList.add('test');

    return testDiv;
}

export default test;