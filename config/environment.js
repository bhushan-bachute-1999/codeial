const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogsStram = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'A79BD84189FDDA91689F14726DB48',
    db:'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'testing.cn.1999@gmail.com',
            pass: 'wxtgrhrwedisfvwa'//uokfzwqcslsdqtfl
        }
    },
    google_clientID: "139427455410-0l1vc77pkse7siojcbtkq625eootbah9.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:8000/user/auth/google/callback",
    jwt_secret_key: 'AC2243E25F941CA92A2E8485F972F',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogsStram}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_USER_EMAIL,
            pass: process.env.CODEIAL_USER_PASSWORD//uokfzwqcslsdqtfl
        }
    },
    google_clientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret_key: process.env.CODEIAL_JWT_SECRET_KEY,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogsStram }
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == 'development' ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = development;

// $env:CODEIAL_DB='codeial_development'
// $env:CODEIAL_ENVIRONMENT='production'
// $env:CODEIAL_SESSION_COOKIE_KEY='A79BD84189FDDA91689F14726DB48'
// $env:CODEIAL_ASSET_PATH='./public/assets'
// $env:CODEIAL_USER_EMAIL='testing.cn.1999@gmail.com'
// $env:CODEIAL_USER_PASSWORD='wxtgrhrwedisfvwa'
// $env:CODEIAL_GOOGLE_CLIENT_ID="139427455410-0l1vc77pkse7siojcbtkq625eootbah9.apps.googleusercontent.com"
// $env:CODEIAL_GOOGLE_CLIENT_SECRET="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"
// $env:CODEIAL_GOOGLE_CALLBACK_URL="http://localhost:8000/user/auth/google/callback"
// $env:CODEIAL_JWT_SECRET_KEY='AC2243E25F941CA92A2E8485F972F' 