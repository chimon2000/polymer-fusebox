const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require('fuse-box')
let fuse
let isProduction = !!process.env.NODE_ENV

Sparky.task('copy-polyfills', () => {
    return Sparky.src('src/webcomponents-lite.js').dest('dist/$name')
})

Sparky.task('clean', () => {
    return Sparky.src('dist/').clean('dist/')
})

Sparky.task('config', ['copy-polyfills'], () => {
    fuse = FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        target: 'browser@es5',
        experimentalFeatures: true,
        hash: isProduction,
        plugins: [
            WebIndexPlugin({
                template: './src/index.html'
            }),
            isProduction &&
                QuantumPlugin({
                    removeExportsInterop: false,
                    uglify: true,
                    treeshake: true
                })
        ]
    })

    fuse
        .bundle('app')
        .instructions(`>index.ts`)
        .watch()
    fuse.dev({ port: 4440 })
})

Sparky.task('default', ['clean', 'config'], () => fuse.run())
