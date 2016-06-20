// twitterモジュールを読み込み
var twitter = require('twitter');

// アプリ登録時に取得したkeyを入れてOAuth認証し、初期化
var client = new twitter({
    consumer_key: 'ZRCMaAAPLeXCEVjImMULHJSXg',
    consumer_secret: '1r8QmZO3qCSsvNkH53ReCBoK8POmJF3SRx7yh69215Us1A2FFo',
    access_token_key: '3215271243-PDIvOHgZLDNvKinpN28MnmdJageb0oKN7MCd5tU',
    access_token_secret: 'eNgltWxBTqVxJvcJBN3DJbo22Rk0iDR0c3vgWdaQuJ5He'
});

// // Public APIのstatuses/filterで取得したタイムラインを、自分のアカウント名を含む文字列でフィルターする
// client.stream( 'statuses/filter', { track : '@youngsnow_sfc' }, function( stream ) {
//     // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
//     stream.on( 'data', function( data ) {
//         var text = data.text; // ツイートのテキスト
//         var textCleaned = text.replace( /@youngsnow_sfc /g, "" ); // アカウント名は不要
//         console.log( textCleaned );
//     });
// });
client.get('account/verify_credentials',
            { include_entities: false, skip_status: true },
            function (error, info, response) {
    if (error) {
        throw error;
    }
    var myid = info.id;
    client.stream('user', function (stream) {
        stream.on('data', function (tweet) {
            var dm = tweet && tweet.direct_message;
			var mt = tweet %%
            if (dm && dm.sender.id != myid) {
                // if dm from others, echo back to the sender
                send_dm(dm.sender.screen_name, dm.text);
            }
        });
        stream.on('error', function (error) {
            throw error;
        });
    });
});


function send_dm(screen_name, text) {
    console.log('sending dm to %s (message: %s)', screen_name, text);
    client.post('direct_messages/new',
                 { screen_name: screen_name, text: text },
                 function (error, tweet, response) {
        if (error) {
            throw error;
        }
    });
}

function send_mention(){
	console.log('sending mention to %s (message: %s)', screen_name, text);

}
