let OSS = require('ali-oss');

let client = new OSS({
    region: '<Your region>',
    accessKeyId: '<Your AccessKeyId>',
    accessKeySecret: '<Your AccessKeySecret>',
    bucket: 'Your bucket name'
});

async function putBuffer() {
    try {
        let result = await client.put('object-name', new Buffer('hello world'));
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}

putBuffer();