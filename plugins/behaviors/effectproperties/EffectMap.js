import AddBarrelProperties from './AddBarrelProperties.js';
import AddBlackWhiteProperties from './colormatrix/AddBlackWhiteProperties.js';
import AddBloomProperties from './AddBloomProperties.js';
import AddBlurProperties from './AddBlurProperties.js';
import AddBokehProperties from './AddBokehProperties.js';
import AddBrightnessProperties from './colormatrix/AddBrightnessProperties.js';
import AddBrownProperties from './colormatrix/AddBrownProperties.js';
import AddCircleProperties from './AddCircleProperties.js';
import AddContrastProperties from './colormatrix/AddContrastProperties.js';
import AddDesaturateProperties from './colormatrix/AddDesaturateProperties.js';
import AddDesaturateLuminanceProperties from './colormatrix/AdddesaturateLuminanceProperties.js';
import AddDisplacementProperties from './AddDisplacementProperties.js';
import AddGlowProperties from './AddGlowProperties.js';
import AddGradientProperties from './AddGradientProperties.js';
import AddGrayscaleProperties from './colormatrix/AddGrayscaleProperties.js';
import AddHueProperties from './colormatrix/AddHueProperties.js';
import AddKodachromeProperties from './colormatrix/AddKodachromeProperties.js';
import AddLSDProperties from './colormatrix/AddLSDProperties.js';
import AddNegativeProperties from './colormatrix/AddNegativeProperties.js';
import AddPixelateProperties from './AddPixelateProperties.js';
import AddPolaroidProperties from './colormatrix/AddPolaroidProperties.js';
import AddRevealProperties from './AddRevealProperties.js';
import AddSaturateProperties from './colormatrix/AddSaturateProperties.js';
import AddSepiaProperties from './colormatrix/AddSepiaProperties.js';
import AddShadowProperties from './AddShadowProperties.js';
import AddShiftToBGRProperties from './colormatrix/AddShiftToBGRProperties.js';
import AddShineProperties from './AddShineProperties.js';
import AddTechnicolorProperties from './colormatrix/AddTechnicolorProperties.js';
import AddTiltShiftProperties from './AddTiltShiftProperties.js';
import AddVignetteProperties from './AddVignetteProperties.js';
import AddVintagePinholeProperties from './colormatrix/AddVintagePinholeProperties.js';
import AddWipeProperties from './AddWipeProperties.js';

const EffectMap = {
    barrel: AddBarrelProperties,
    blackWhite: AddBlackWhiteProperties,
    bloom: AddBloomProperties,
    blur: AddBlurProperties,
    bokeh: AddBokehProperties,
    brightness: AddBrightnessProperties,
    brown: AddBrownProperties,
    circle: AddCircleProperties,
    contrast: AddContrastProperties,
    desaturate: AddDesaturateProperties,
    desaturateLuminance: AddDesaturateLuminanceProperties,
    displacement: AddDisplacementProperties,
    glow: AddGlowProperties,
    gradient: AddGradientProperties,
    grayscale: AddGrayscaleProperties,
    hue: AddHueProperties,
    kodachrome: AddKodachromeProperties,
    lsd: AddLSDProperties,
    negative: AddNegativeProperties,
    pixelate: AddPixelateProperties,
    polaroid: AddPolaroidProperties,
    reveal: AddRevealProperties,
    saturate: AddSaturateProperties,
    sepia: AddSepiaProperties,
    shadow: AddShadowProperties,
    shiftToBGR: AddShiftToBGRProperties,
    shine: AddShineProperties,
    technicolor: AddTechnicolorProperties,
    tiltShift: AddTiltShiftProperties,
    vignette: AddVignetteProperties,
    vintagePinhole: AddVintagePinholeProperties,
    wipe: AddWipeProperties
}

export default EffectMap;