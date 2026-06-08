class ChimePlayer {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      // Traditional temple bell harmonics (sine waves combined to sound resonant)
      const frequencies = [880, 1046.5, 1318.5, 1760];
      const gains = [0.3, 0.15, 0.1, 0.05];
      
      frequencies.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(gains[index], now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        
        osc.connect(gainNode);
        gainNode.connect(this.ctx!.destination);
        
        osc.start(now);
        osc.stop(now + 1.3);
      });
    } catch (e) {
      console.warn("Audio Context failed to play chime", e);
    }
  }

  playSuccess() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const playBellAt = (time: number, baseFreq: number) => {
        const frequencies = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];
        const gains = [0.25, 0.15, 0.1, 0.05];
        frequencies.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gainNode = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, time);
          gainNode.gain.setValueAtTime(0, time);
          gainNode.gain.linearRampToValueAtTime(gains[idx], time + 0.015);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);
          osc.connect(gainNode);
          gainNode.connect(this.ctx!.destination);
          osc.start(time);
          osc.stop(time + 1.9);
        });
      };
      
      // Beautiful ascending major arpeggio
      playBellAt(now, 523.25);        // C5
      playBellAt(now + 0.15, 659.25);  // E5
      playBellAt(now + 0.3, 783.99);   // G5
      playBellAt(now + 0.45, 1046.5);  // C6
    } catch (e) {
      console.warn("Audio Context failed to play success sound", e);
    }
  }
}

export const audioFeedback = new ChimePlayer();
export default audioFeedback;
