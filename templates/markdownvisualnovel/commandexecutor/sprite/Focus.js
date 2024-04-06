var Focus = function (
    gameObject,
    {
        fadeOutOthers = 0x000000,
    } = {},
    commandExecutor, eventSheetManager, eventSheet
) {

    gameObject.bringMeToTop();
    commandExecutor.setGOProperty(
        {
            id: '!' + gameObject.name,
            tint: fadeOutOthers,
        },
        eventSheetManager
    )
}

export default Focus;