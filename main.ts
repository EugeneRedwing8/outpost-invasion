namespace SpriteKind {
    export const SCREEN = SpriteKind.create()
    export const EnemyLaser = SpriteKind.create()
    export const Cursor = SpriteKind.create()
    export const ArmoredMini = SpriteKind.create()
    export const Text = SpriteKind.create()
    export const Score = SpriteKind.create()
    export const Bar = SpriteKind.create()
}
namespace StatusBarKind {
    export const Armor = StatusBarKind.create()
}
function ShootMiniImage (mini: Sprite) {
    characterAnimations.setCharacterAnimationsEnabled(mini, false)
    mini.vx = 0
    mini.vy = 0
    if (spriteutils.angleFrom(mini, mySprite) > -2.5 && spriteutils.angleFrom(mini, mySprite) < -0.5) {
        animation.runImageAnimation(
        mini,
        assets.animation`UpShoot`,
        500,
        false
        )
    }
    if (spriteutils.angleFrom(mini, mySprite) < 2.5 && spriteutils.angleFrom(mini, mySprite) > 0.5) {
        animation.runImageAnimation(
        mini,
        assets.animation`DownShoot`,
        500,
        false
        )
    }
    if (spriteutils.angleFrom(mini, mySprite) > 2.5 && spriteutils.angleFrom(mini, mySprite) < 3.5 || spriteutils.angleFrom(mySprite, mySprite2) > -3.5 && spriteutils.angleFrom(mySprite, mySprite2) < -2.5) {
        animation.runImageAnimation(
        mini,
        assets.animation`LeftShoot`,
        200,
        false
        )
    }
    if (spriteutils.angleFrom(mini, mySprite) > -0.5 && spriteutils.angleFrom(mini, mySprite) < 0.5) {
        animation.runImageAnimation(
        mini,
        assets.animation`RightShoot`,
        200,
        false
        )
    }
    timer.after(500, function () {
        characterAnimations.setCharacterAnimationsEnabled(mini, true)
    })
}
function PlaySound (sound: string) {
    if (sound == "Playershoot") {
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 706, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        music.play(music.createSoundEffect(WaveShape.Triangle, 1706, 1001, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else {
    	
    }
}
function WAVE (wave: number) {
    controller.moveSprite(mySprite, 100, 100)
    if (wave == 0) {
        MaxMinis = 3
        MaxSteelMinis = 0
        EnemyNumber = MaxMinis + MaxSteelMinis
    } else if (wave == 1) {
        MaxMinis = 5
        MaxSteelMinis = 0
        EnemyNumber = MaxMinis + MaxSteelMinis
    } else if (wave == 2) {
        MaxMinis = 8
        MaxSteelMinis = 0
        EnemyNumber = MaxMinis + MaxSteelMinis
    } else if (wave == 3) {
        MaxMinis = 3
        MaxSteelMinis = 2
        EnemyNumber = MaxMinis + MaxSteelMinis
    } else {
        game.gameOver(true)
    }
    PlayerHP.setScale(2, ScaleAnchor.Middle)
    PlayerHP.value = PlayerHP.max
    PlayerHP.setColor(9, 14)
    PlayerHP.setBarBorder(2, 15)
    PlayerHP.setLabel("Player", 15)
    PlayerHP.setPosition(239, 10)
}
function power_bar () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Bar)
    powerBarPicture = assets.image`RechargeBar`
    divider = Math.round(currentPower * (image.getDimension(powerBarPicture, image.Dimension.Height) / maxPower))
    powerBarPicture.fillRect(0, divider, image.getDimension(powerBarPicture, image.Dimension.Width), image.getDimension(powerBarPicture, image.Dimension.Height) - divider, 15)
    powerBarPicture.drawRect(0, 0, image.getDimension(powerBarPicture, image.Dimension.Width), image.getDimension(powerBarPicture, image.Dimension.Height), 15)
    powerBarPicture.flipY()
    powerBar = sprites.create(powerBarPicture, SpriteKind.Bar)
    powerBar.setPosition(462, 335)
    powerBar.setFlag(SpriteFlag.RelativeToCamera, true)
}
scene.onHitWall(SpriteKind.EnemyLaser, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.ArmoredMini, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.createSoundEffect(WaveShape.Noise, 4251, 2215, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 531, 0, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    extraEffects.createSpreadEffectOnAnchor(sprite, YellowHit, 100)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Armor, sprite).value += -1
})
spriteutils.createRenderable(9001, function (screen2) {
    let RecordingShowing = 0
    if (RecordingShowing) {
        for (let Y3 = 0; Y3 <= scene.screenHeight() - 1; Y3++) {
            for (let X3 = 0; X3 <= scene.screenWidth() - 1; X3++) {
                if (Y3 % 2 == 0) {
                    screen2.setPixel(X3, Y3, darkenedPalette[screen2.getPixel(X3, Y3)])
                }
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.createSoundEffect(WaveShape.Noise, 2426, 0, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Noise, 531, 0, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    extraEffects.createSpreadEffectOnAnchor(sprite, YellowHit, 100)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, sprite).value += -1
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    Kills += 1
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1092, 0, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 1900, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Square, 2005, 917, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Square, 1092, 2637, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    if (sprites.readDataBoolean(status.spriteAttachedTo(), "SteelMini")) {
        if (Math.percentChance(50)) {
            spriteutils.drawTransparentImage(assets.image`DeadSteelMini1`, SCREENIMAGE.image, status.spriteAttachedTo().x, status.spriteAttachedTo().y)
        } else {
            spriteutils.drawTransparentImage(assets.image`DeadSteelMini2`, SCREENIMAGE.image, status.spriteAttachedTo().x, status.spriteAttachedTo().y)
        }
    } else {
        if (Math.percentChance(50)) {
            spriteutils.drawTransparentImage(assets.image`DeadMini1`, SCREENIMAGE.image, status.spriteAttachedTo().x, status.spriteAttachedTo().y)
        } else {
            spriteutils.drawTransparentImage(assets.image`DeadMini2`, SCREENIMAGE.image, status.spriteAttachedTo().x, status.spriteAttachedTo().y)
        }
    }
    sprites.destroy(status.spriteAttachedTo())
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    CanPlaySong = false
    music.stopAllSounds()
    Coin = 0
    fancyText.setText(GameOverText, "<wavy> GAME </wavy>\\n <shaky> OVER </shaky>\\n" + "<dark purple> you survived\\n" + wave + "\\nWAVES\\n<yellow><blink>PRESS A TO RESTART")
    wave = 0
    status.max = 5
    blockSettings.clear()
    sprites.destroyAllSpritesOfKind(SpriteKind.StatusBar)
    sprites.destroyAllSpritesOfKind(SpriteKind.SCREEN)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.ArmoredMini)
    sprites.destroyAllSpritesOfKind(SpriteKind.EnemyLaser)
    characterAnimations.setCharacterState(mySprite, characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving))
    controller.moveSprite(mySprite, 0, 0)
    music.play(music.createSoundEffect(WaveShape.Square, 1, 1163, 255, 0, 3000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Square, 501, 1663, 255, 0, 3000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    timer.after(3000, function () {
        extraEffects.createSpreadEffectOnAnchor(mySprite, Explosion, 5000, 150, 250)
        extraEffects.createSpreadEffectOnAnchor(mySprite, Smoke, 6000, 150, 250)
        music.play(music.createSoundEffect(WaveShape.Noise, 3198, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        music.play(music.createSoundEffect(WaveShape.Noise, 426, 1, 255, 0, 5000, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        music.play(music.createSoundEffect(WaveShape.Noise, 926, 1, 255, 0, 5000, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        scene.cameraShake(16, 5000)
        sprites.destroy(mySprite)
        timer.after(6500, function () {
            screenTransitions.startTransition(screenTransitions.Circle, 500, true)
            pauseUntil(() => controller.A.isPressed())
            game.reset()
        })
    })
})
function ShootPlayerImage () {
    characterAnimations.setCharacterAnimationsEnabled(mySprite, false)
    controller.moveSprite(mySprite, 0, 0)
    if (spriteutils.angleFrom(mySprite, mySprite2) > -2.5 && spriteutils.angleFrom(mySprite, mySprite2) < -0.5) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`UpShoot`,
        500,
        false
        )
    }
    if (spriteutils.angleFrom(mySprite, mySprite2) < 2.5 && spriteutils.angleFrom(mySprite, mySprite2) > 0.5) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`DownShoot`,
        500,
        false
        )
    }
    if (spriteutils.angleFrom(mySprite, mySprite2) > 2.5 && spriteutils.angleFrom(mySprite, mySprite2) < 3.5 || spriteutils.angleFrom(mySprite, mySprite2) > -3.5 && spriteutils.angleFrom(mySprite, mySprite2) < -2.5) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`LeftShoot`,
        200,
        false
        )
    }
    if (spriteutils.angleFrom(mySprite, mySprite2) > -0.5 && spriteutils.angleFrom(mySprite, mySprite2) < 0.5) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`RightShoot`,
        200,
        false
        )
    }
    timer.after(500, function () {
        controller.moveSprite(mySprite, 100, 100)
        characterAnimations.setCharacterAnimationsEnabled(mySprite, true)
    })
}
browserEvents.onMouseMove(function (x, y) {
    mySprite2.setPosition(x, y)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    blockSettings.clear()
    game.reset()
})
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    // 0=Pistol
    // 1=Revolver
    // More to come
    if (Gun == 0) {
        if (currentPower == 5) {
            ShootPlayerImage()
            projectile = sprites.createProjectileFromSprite(assets.image`Laser1`, mySprite, 0, 0)
            spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(mySprite, mySprite2), 400)
            extraEffects.createSpreadEffectOnAnchor(projectile, YellowBlast, 400, 48, 100)
            extraEffects.createSpreadEffectOnAnchor(mySprite, Smoke, 1000)
            PlaySound("Playershoot")
            currentPower = 0
            recharge = true
            power_bar()
        }
    } else if (Gun == 1) {
        if (currentPower > 0) {
            projectile = sprites.createProjectileFromSprite(assets.image`Laser1`, mySprite, 0, 0)
            spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(mySprite, mySprite2), 400)
            extraEffects.createSpreadEffectOnAnchor(projectile, YellowBlast, 400, 48, 100)
            extraEffects.createSpreadEffectOnAnchor(mySprite, Smoke, 1000)
            PlaySound("Playershoot")
            currentPower += -1
            power_bar()
            if (currentPower == 0) {
                recharge = true
            }
        }
    } else {
    	
    }
})
function EFFECTS () {
    YellowBlast = extraEffects.createCustomSpreadEffectData(
    [4, 12],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
    extraEffects.createPercentageRange(0, 10),
    extraEffects.createPercentageRange(20, 30),
    extraEffects.createTimeRange(500, 1000)
    )
    YellowBlast.z = 101
    PinkBlast = extraEffects.createCustomSpreadEffectData(
    [7, 8],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
    extraEffects.createPercentageRange(0, 10),
    extraEffects.createPercentageRange(20, 30),
    extraEffects.createTimeRange(500, 1000)
    )
    PinkBlast.z = 101
    Smoke = extraEffects.createCustomSpreadEffectData(
    [2, 3, 15],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Explosion),
    extraEffects.createPercentageRange(0, 10),
    extraEffects.createPercentageRange(20, 30),
    extraEffects.createTimeRange(500, 1000)
    )
    Smoke.extraVY = -300
    Smoke.z = 101
    PinkHit = extraEffects.createCustomSpreadEffectData(
    [7, 8],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Explosion),
    extraEffects.createPercentageRange(30, 40),
    extraEffects.createPercentageRange(60, 80),
    extraEffects.createTimeRange(500, 1000)
    )
    PinkHit.z = 102
    YellowHit = extraEffects.createCustomSpreadEffectData(
    [5, 4],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Explosion),
    extraEffects.createPercentageRange(30, 40),
    extraEffects.createPercentageRange(60, 80),
    extraEffects.createTimeRange(500, 1000)
    )
    YellowHit.z = 102
    Explosion = extraEffects.createCustomSpreadEffectData(
    [
    5,
    4,
    14,
    13,
    12
    ],
    false,
    extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Explosion),
    extraEffects.createPercentageRange(0, 1),
    extraEffects.createPercentageRange(90, 120),
    extraEffects.createTimeRange(100, 500)
    )
    Explosion.z = 102
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite)
})
function StartGame () {
	
}
statusbars.onZero(StatusBarKind.Armor, function (status) {
    music.play(music.createSoundEffect(WaveShape.Noise, 1092, 0, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Square, 1092, 0, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Noise, 3795, 2917, 255, 0, 200, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 952, 2917, 255, 0, 200, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    status.spriteAttachedTo().setKind(SpriteKind.Enemy)
    sprites.setDataBoolean(status.spriteAttachedTo(), "SteelMini", true)
    HPbar = statusbars.create(40, 4, StatusBarKind.EnemyHealth)
    HPbar.max = 3
    HPbar.setColor(6, 9)
    HPbar.setBarBorder(1, 15)
    HPbar.setLabel("Steel Mini", 15)
    HPbar.attachToSprite(status.spriteAttachedTo())
    sprites.destroy(status)
    SteelMini = status.spriteAttachedTo()
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniUp`,
    200,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniUp`,
    200,
    characterAnimations.rule(Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniRight`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniRight`,
    200,
    characterAnimations.rule(Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniDown`,
    200,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniDown`,
    200,
    characterAnimations.rule(Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniLeft`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    SteelMini,
    assets.animation`SteelMiniLeft`,
    200,
    characterAnimations.rule(Predicate.FacingLeft)
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyLaser, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.createSoundEffect(WaveShape.Noise, 461, 0, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Noise, 601, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    scene.cameraShake(8, 200)
    extraEffects.createSpreadEffectOnAnchor(sprite, PinkHit, 100)
    PlayerHP.value += -1
})
let Mini: Sprite = null
let Shop: miniMenu.MenuSprite = null
let myTextSprite: fancyText.TextSprite = null
let SteelMini: Sprite = null
let HPbar: StatusBarSprite = null
let PinkHit: SpreadEffectData = null
let PinkBlast: SpreadEffectData = null
let recharge = false
let YellowBlast: SpreadEffectData = null
let projectile: Sprite = null
let Smoke: SpreadEffectData = null
let Explosion: SpreadEffectData = null
let Kills = 0
let YellowHit: SpreadEffectData = null
let powerBar: Sprite = null
let divider = 0
let powerBarPicture: Image = null
let EnemyNumber = 0
let MaxSteelMinis = 0
let MaxMinis = 0
let currentPower = 0
let maxPower = 0
let CanPlaySong = false
let Gun = 0
let wave = 0
let Coin = 0
let PlayerHP: StatusBarSprite = null
let mySprite: Sprite = null
let darkenedPalette: number[] = []
let GameOverText: fancyText.TextSprite = null
let mySprite2: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 480
    export const ARCADE_SCREEN_HEIGHT = 368
}
mySprite2 = sprites.create(img`
    . . . f f f . . . 
    . . f e e e f . . 
    . f e e e e e f . 
    f e e f f f e e f 
    f e e f . f e e f 
    f e e f f f e e f 
    . f e e e e e f . 
    . . f e e e f . . 
    . . . f f f . . . 
    `, SpriteKind.Cursor)
if (!(blockSettings.exists("Wave"))) {
    blockSettings.writeNumber("Wave", 0)
}
if (!(blockSettings.exists("Coins"))) {
    blockSettings.writeNumber("Coins", 0)
}
if (!(blockSettings.exists("hpmax"))) {
    blockSettings.writeNumber("hpmax", 10)
}
if (!(blockSettings.exists("gun"))) {
    blockSettings.writeNumber("gun", 0)
}
let SCREENIMAGE = sprites.create(image.create(scene.screenWidth(), scene.screenHeight()), SpriteKind.SCREEN)
screenTransitions.setZ(-10, 1000)
GameOverText = fancyText.create("<wavy> GAME </wavy>\\n <shaky> OVER </shaky>\\n" + "<dark purple> you survived\\n" + "0" + "\\nWAVES\\n<yellow><blink>PRESS A TO RESTART", 0, 14, fancyText.rounded_large)
GameOverText.z = -11
darkenedPalette = [
images.colorBlock(0),
images.colorBlock(2),
images.colorBlock(3),
images.colorBlock(15),
images.colorBlock(12),
images.colorBlock(4),
images.colorBlock(9),
images.colorBlock(8),
images.colorBlock(14),
images.colorBlock(11),
images.colorBlock(11),
images.colorBlock(13),
images.colorBlock(13),
images.colorBlock(15),
images.colorBlock(13),
images.colorBlock(15)
]
let currentShader = 3
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`level1`)
VisualTileMapLayers.addVisualTileMapLayer(tilemap`level3`, 100)
mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
mySprite.setPosition(240, 300)
controller.moveSprite(mySprite, 100, 100)
PlayerHP = statusbars.create(200, 8, StatusBarKind.Health)
PlayerHP.max = blockSettings.readNumber("hpmax")
EFFECTS()
let ScoreText = fancyText.create("" + Coin + " COINS", 0, 5, fancyText.rounded_large)
fancyText.setFrame(ScoreText, assets.image`Frame2`)
ScoreText.setKind(SpriteKind.Score)
wave = blockSettings.readNumber("Wave")
Coin = blockSettings.readNumber("Coins")
Gun = blockSettings.readNumber("gun")
WAVE(wave)
music.setVolume(100)
CanPlaySong = true
maxPower = 5
currentPower = 5
power_bar()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.StatusBar)) {
        value.z = 101
    }
})
game.onUpdate(function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Cursor)) {
        value2.z = 101
    }
})
game.onUpdate(function () {
    for (let value3 of sprites.allOfKind(SpriteKind.EnemyLaser)) {
        value3.z = 101
    }
})
game.onUpdate(function () {
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`UpRun`,
    150,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`Up`,
    200,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`RightRun`,
    150,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`Right`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`DownRun`,
    150,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`Down`,
    200,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`LeftRun`,
    150,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    assets.animation`Left`,
    150,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
})
game.onUpdate(function () {
    for (let value4 of sprites.allOfKind(SpriteKind.Projectile)) {
        value4.z = 101
    }
})
game.onUpdate(function () {
    for (let value6 of sprites.allOfKind(SpriteKind.Score)) {
        value6.z = 101
    }
})
game.onUpdate(function () {
    if (Kills == EnemyNumber) {
        Kills = 0
        timer.after(1500, function () {
            SCREENIMAGE.setImage(image.create(scene.screenWidth(), scene.screenHeight()))
            music.play(music.createSoundEffect(WaveShape.Square, 1900, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1900, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            music.play(music.createSoundEffect(WaveShape.Noise, 1900, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            myTextSprite = fancyText.create("WAVE " + (wave + 1) + " DEFEATED", 0, 9, fancyText.rounded_large)
            myTextSprite.setKind(SpriteKind.Text)
            fancyText.setFrame(myTextSprite, assets.image`Frame1`)
            scene.cameraShake(16, 200)
            timer.after(1500, function () {
                sprites.destroy(myTextSprite)
                myTextSprite = fancyText.create("+" + EnemyNumber * 5 + " COINS!", 0, 5, fancyText.rounded_large)
                Coin += EnemyNumber * 5
                myTextSprite.setKind(SpriteKind.Text)
                fancyText.setFrame(myTextSprite, assets.image`Frame2`)
                music.play(music.createSong(assets.song`COINS`), music.PlaybackMode.InBackground)
                timer.after(1500, function () {
                    sprites.destroy(myTextSprite)
                    controller.moveSprite(mySprite, 0, 0)
                    Shop = miniMenu.createMenu(
                    miniMenu.createMenuItem("+5 HEALTH (10 coins)", assets.image`heart`),
                    miniMenu.createMenuItem("LASER REVOLVER (20 coins)", assets.image`revolver`)
                    )
                    Shop.setPosition(240, 304)
                    Shop.setTitle("SHOP")
                    Shop.setFrame(assets.image`Frame3`)
                    Shop.onButtonPressed(controller.A, function (selection, selectedIndex) {
                        Shop.close()
                        if (selection == "+5 HEALTH (10 coins)") {
                            if (Coin >= 10) {
                                Coin += -10
                                PlayerHP.max += 5
                            }
                        } else if (selection == "LASER REVOLVER (20 coins)") {
                            if (Coin >= 20) {
                                Coin += -20
                                Gun = 1
                            }
                        } else {
                        	
                        }
                        timer.after(1500, function () {
                            sprites.destroy(myTextSprite)
                            music.play(music.createSoundEffect(WaveShape.Square, 1, 1900, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                            music.play(music.createSoundEffect(WaveShape.Sawtooth, 0, 1900, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                            music.play(music.createSoundEffect(WaveShape.Noise, 0, 1900, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                            myTextSprite = fancyText.create("WAVE " + (wave + 2) + " INCOMING", 0, 14, fancyText.rounded_large)
                            myTextSprite.setKind(SpriteKind.Text)
                            fancyText.setFrame(myTextSprite, assets.image`Frame4`)
                            scene.cameraShake(16, 200)
                            timer.after(1500, function () {
                                sprites.destroy(myTextSprite)
                                scene.cameraShake(16, 200)
                                wave += 1
                                WAVE(wave)
                            })
                        })
                    })
                })
            })
        })
    }
})
game.onUpdate(function () {
    for (let value5 of sprites.allOfKind(SpriteKind.Text)) {
        value5.z = 101
    }
})
game.onUpdate(function () {
	
})
game.onUpdate(function () {
    if (Gun == 0) {
        if (currentPower == 0) {
            if (recharge) {
                recharge = false
                timer.after(200, function () {
                    currentPower += 1
                    power_bar()
                    timer.after(200, function () {
                        currentPower += 1
                        power_bar()
                        timer.after(200, function () {
                            currentPower += 1
                            power_bar()
                            timer.after(200, function () {
                                currentPower += 1
                                power_bar()
                                timer.after(200, function () {
                                    currentPower += 1
                                    power_bar()
                                })
                            })
                        })
                    })
                })
            }
        }
    } else {
        if (currentPower < 1) {
            if (recharge) {
                recharge = false
                timer.after(500, function () {
                    currentPower += 1
                    power_bar()
                    timer.after(500, function () {
                        currentPower += 1
                        power_bar()
                        timer.after(500, function () {
                            currentPower += 1
                            power_bar()
                            timer.after(500, function () {
                                currentPower += 1
                                power_bar()
                                timer.after(500, function () {
                                    currentPower += 1
                                    power_bar()
                                })
                            })
                        })
                    })
                })
            }
        }
    }
})
game.onUpdate(function () {
    for (let value7 of sprites.allOfKind(SpriteKind.Score)) {
        value7.left = scene.cameraProperty(CameraProperty.Left)
        value7.bottom = scene.cameraProperty(CameraProperty.Bottom)
        fancyText.setText(value7, "" + Coin + " COINS")
    }
})
game.onUpdate(function () {
    if (PlayerHP) {
        blockSettings.writeNumber("Coins", Coin)
        Coin = blockSettings.readNumber("Coins")
        blockSettings.writeNumber("Wave", wave)
        wave = blockSettings.readNumber("Wave")
        blockSettings.writeNumber("hpmax", PlayerHP.max)
        PlayerHP.max = blockSettings.readNumber("hpmax")
        blockSettings.writeNumber("gun", Gun)
        Gun = blockSettings.readNumber("gun")
    }
})
game.onUpdateInterval(1000, function () {
    for (let value22 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (Math.percentChance(40)) {
            value22.vy = 120
        } else if (Math.percentChance(40)) {
            value22.vy = -120
        } else {
            value22.vy = 0
        }
    }
    for (let value23 of sprites.allOfKind(SpriteKind.ArmoredMini)) {
        if (Math.percentChance(40)) {
            value23.vy = 120
        } else if (Math.percentChance(40)) {
            value23.vy = -120
        } else {
            value23.vy = 0
        }
    }
})
game.onUpdateInterval(1000, function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (Math.percentChance(40)) {
            value8.vx = -120
        } else if (Math.percentChance(40)) {
            value8.vx = 120
        } else {
            value8.vx = 0
        }
    }
    for (let value9 of sprites.allOfKind(SpriteKind.ArmoredMini)) {
        if (Math.percentChance(40)) {
            value9.vx = -120
        } else if (Math.percentChance(40)) {
            value9.vx = 120
        } else {
            value9.vx = 0
        }
    }
})
forever(function () {
    while (CanPlaySong) {
        if (CanPlaySong) {
            music.play(music.createSong(assets.song`BARRAGEpt1`), music.PlaybackMode.UntilDone)
        }
        if (CanPlaySong) {
            music.play(music.createSong(assets.song`BARRAGEpt2`), music.PlaybackMode.UntilDone)
        }
    }
})
game.onUpdateInterval(500, function () {
    if (MaxMinis > 0) {
        if (Math.percentChance(50)) {
            MaxMinis += -1
            Mini = sprites.create(assets.image`Mini`, SpriteKind.Enemy)
            HPbar = statusbars.create(40, 4, StatusBarKind.EnemyHealth)
            HPbar.max = 3
            HPbar.setColor(10, 11)
            HPbar.setBarBorder(1, 15)
            HPbar.setLabel("Mini", 15)
            HPbar.attachToSprite(Mini)
            Mini.setPosition(randint(20, 460), 10)
            Mini.vy = 120
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniUpRun`,
            150,
            characterAnimations.rule(Predicate.MovingUp)
            )
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniUp`,
            200,
            characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniRightRun`,
            150,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniRight`,
            200,
            characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniDownRun`,
            150,
            characterAnimations.rule(Predicate.MovingDown)
            )
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniDown`,
            200,
            characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
            )
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniLeftRun`,
            150,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            characterAnimations.loopFrames(
            Mini,
            assets.animation`MiniLeft`,
            200,
            characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
            )
        }
    }
    if (MaxSteelMinis > 0) {
        if (Math.percentChance(50)) {
            MaxSteelMinis += -1
            SteelMini = sprites.create(assets.image`Mini`, SpriteKind.ArmoredMini)
            HPbar = statusbars.create(40, 4, StatusBarKind.Armor)
            HPbar.max = 2
            HPbar.setColor(12, 13)
            HPbar.setBarBorder(1, 15)
            HPbar.setLabel("Steel Mini", 15)
            HPbar.attachToSprite(SteelMini)
            SteelMini.setPosition(randint(20, 460), 10)
            SteelMini.vy = 120
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniUpArmored`,
            200,
            characterAnimations.rule(Predicate.MovingUp)
            )
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniUpArmored`,
            200,
            characterAnimations.rule(Predicate.FacingUp)
            )
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniRightArmored`,
            200,
            characterAnimations.rule(Predicate.MovingRight)
            )
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniRightArmored`,
            200,
            characterAnimations.rule(Predicate.FacingRight)
            )
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniDownArmored`,
            200,
            characterAnimations.rule(Predicate.MovingDown)
            )
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniDownArmored`,
            200,
            characterAnimations.rule(Predicate.FacingDown)
            )
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniLefttArmored`,
            200,
            characterAnimations.rule(Predicate.MovingLeft)
            )
            characterAnimations.loopFrames(
            SteelMini,
            assets.animation`SteelMiniLefttArmored`,
            200,
            characterAnimations.rule(Predicate.FacingLeft)
            )
        }
    }
})
game.onUpdateInterval(100, function () {
    for (let value32 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (Math.percentChance(5)) {
            projectile = sprites.createProjectileFromSprite(assets.image`Laser2`, value32, 0, 0)
            spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(value32, mySprite) + randint(-1, 1), 300)
            projectile.setKind(SpriteKind.EnemyLaser)
            extraEffects.createSpreadEffectOnAnchor(projectile, PinkBlast, 400, 48, 100)
            extraEffects.createSpreadEffectOnAnchor(value32, Smoke, 1000)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1057, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            music.play(music.createSoundEffect(WaveShape.Square, 2057, 1001, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
    }
    for (let value33 of sprites.allOfKind(SpriteKind.ArmoredMini)) {
        if (Math.percentChance(5)) {
            projectile = sprites.createProjectileFromSprite(assets.image`Laser2`, value33, 0, 0)
            spriteutils.setVelocityAtAngle(projectile, spriteutils.angleFrom(value33, mySprite) + randint(-1, 1), 300)
            projectile.setKind(SpriteKind.EnemyLaser)
            extraEffects.createSpreadEffectOnAnchor(projectile, PinkBlast, 400, 48, 100)
            extraEffects.createSpreadEffectOnAnchor(value33, Smoke, 1000)
            music.play(music.createSoundEffect(WaveShape.Sawtooth, 1057, 1, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            music.play(music.createSoundEffect(WaveShape.Square, 2057, 1001, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
    }
})
game.onUpdateInterval(300, function () {
    for (let value10 of tiles.getTilesByType(assets.tile`myTile`)) {
        tiles.setTileAt(value10, assets.tile`myTile0`)
        timer.after(100, function () {
            tiles.setTileAt(value10, assets.tile`myTile1`)
            timer.after(100, function () {
                tiles.setTileAt(value10, assets.tile`myTile`)
            })
        })
    }
    for (let value11 of tiles.getTilesByType(assets.tile`myTile0`)) {
        tiles.setTileAt(value11, assets.tile`myTile1`)
        timer.after(100, function () {
            tiles.setTileAt(value11, assets.tile`myTile`)
            timer.after(100, function () {
                tiles.setTileAt(value11, assets.tile`myTile0`)
            })
        })
    }
    for (let value12 of tiles.getTilesByType(assets.tile`myTile1`)) {
        tiles.setTileAt(value12, assets.tile`myTile`)
        timer.after(100, function () {
            tiles.setTileAt(value12, assets.tile`myTile0`)
            timer.after(100, function () {
                tiles.setTileAt(value12, assets.tile`myTile1`)
            })
        })
    }
})
