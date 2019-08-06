const dummyArray = [60, 0.8];
var synth = new Tone.Synth().toMaster();

function playData() {
    synth.volume.value = 6;

    synth.triggerAttackRelease(Tone.Frequency(60, "midi").toNote(), "8n");
}