const Slash = require('slash');

module.exports = function TimeStamps(dispatch){
    const slash = new Slash(dispatch);
    let enabled = true;

    slash.on('ts', (args) => {
        args.shift();
        enabled = (args[0] === 'on');
        let status =  (enabled ? 'enabled' : 'disabled')
        slash.print('[timestamps] ' + status);
    })

    function processEvent(event){
        if(!enabled) return;
        if(event.channel === 26) return
        var time = new Date();
        var timeStr = ("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2);
        event.authorName = `</a>${timeStr}][<a href='asfunction:chatNameAction,${event.authorName}@0@0'>${event.authorName}</a>`;
        return true;
    }
	
	function processEventWhisper(event){
        if(!enabled) return;
        var time = new Date();
        var timeStr = ("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2);
		event.recipient = `</a>${timeStr}][<a href='asfunction:chatNameAction,${event.recipient}@0@0'>${event.recipient}</a>`;
        event.author = `</a>${timeStr}][<a href='asfunction:chatNameAction,${event.author}@0@0'>${event.author}</a>`;
        return true;
    }
	//dispatch.hook('sWhisper', processEventWhisper);
    dispatch.hook('sChat', processEvent);
    dispatch.hook('sPrivateChat', processEvent);
}