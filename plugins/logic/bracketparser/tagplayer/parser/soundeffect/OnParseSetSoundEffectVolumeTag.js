var OnParseSetSoundEffectVolumeTag = function (tagPlayer, parser, config) {
    var tagName = 'se.volume';
    parser
        .on(`+${tagName}`, function (volume) {
            tagPlayer.soundManager.setSoundEffectVolume(volume, true);

            parser.skipEvent();
        })
        .on(`-${tagName}`, function () {
            parser.skipEvent();
        })
}

export default OnParseSetSoundEffectVolumeTag;