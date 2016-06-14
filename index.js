// twitterモジュールを読み込み
var twitter = require('twitter');

// アプリ登録時に取得したkeyを入れてOAuth認証し、初期化
var client = new twitter({
    consumer_key: 'XNOaw5iIWGAFNzQe1GvpPzPyB',
    consumer_secret: 'TZeuIir3Ck1CTDNMaGiqz3xEmsmvwNA6z1afiVoY08mth5qHhq',
    access_token_key: '3215271243-LSjlAVzJkVPZw51jRye1CgxBX34jPwfa9lAXe3A',
    access_token_secret: 'uHXGOj1WUiAeaWbV5UkPRAQfdUpE7EyDIqQJcqLMD4S4m'
});

// Public APIのstatuses/filterで取得したタイムラインを、自分のアカウント名を含む文字列でフィルターする
client.stream( 'statuses/filter', { track : '@youngsnow_sfc' }, function( stream ) {
    // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
    stream.on( 'data', function( data ) {
        var text = data.text; // ツイートのテキスト
        var textCleaned = text.replace( /@youngsnow_sfc/g, "" ); // アカウント名は不要
        console.log( textCleaned );
    });
});
