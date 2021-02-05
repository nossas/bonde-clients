const fs = require("fs");
const RSMQWorker = require("rsmq-worker");

export const fnCheck = function (msg: any) {
    // check function to not exceed the message if the content is `createmessages`
    if (msg.message === "createmessages") {
        return true
    }
    return false
}

const worker = new RSMQWorker("myqueue", {
    interval: [.1, 1],				// wait 100ms between every receive and step up to 1,3 on empty receives
    invisibletime: 2,						// hide received message for 5 sec
    maxReceiveCount: 2,					// only receive a message 2 times until delete
    autostart: true,						// start worker on init
    customExceedCheck: fnCheck	// set the custom exceed check
});

// Listen to errors
worker.on('error', function (err: any, msg: any) {
    console.log("ERROR", err, msg.id);
});
worker.on('timeout', function (msg: any) {
    console.log("TIMEOUT", msg.id, msg.rc);
});

// handle exceeded messages
// grab the internal rsmq instance
export const rsmq = worker._getRsmq();
worker.on('exceeded', function (msg: any) {
    console.log("EXCEEDED", msg.id);
    // NOTE: make sure this queue exists
    rsmq.sendMessage("YOUR_EXCEEDED_QUEUE", msg, function (err: any, resp: any) {
        if (err) {
            console.error("write-to-exceeded-queue", err)
        }
    });
});

// listen to messages
worker.on("message", function (message: any, next: any, id: number) {

    console.log("message", message);

    if (message === "createmessages") {
        next(false)
        worker.send(JSON.stringify({ type: "writefile", filename: "./test.txt", txt: "Foo Bar" }));
        worker.send(JSON.stringify({ type: "deletefile", filename: "./test.txt" }));
        return
    }

    const _data = JSON.parse(message)
    switch (_data.type) {
        case "writefile":
            fs.writeFile(_data.filename, _data.txt, function (err: any) {
                if (err) {
                    next(err);
                } else {
                    next()
                }
            });
            break;
        case "deletefile":
            fs.unlink(_data.filename, function (err: any) {
                if (err) {
                    next(err);
                } else {
                    next()
                }
            });
            break;
    }

});

export default worker;