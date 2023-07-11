import { Component, ElementRef, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';
import JSConfetti from 'js-confetti'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  socket = io('https://chat-back-2qpv.onrender.com')
  data: any = {}
  mensajes: any[] = []
  numParticipantes: number = 0
  @ViewChild('divMensajes') divMensajes!: ElementRef
  audioOn: boolean = true

  ngOnInit() {
    this.socket.on('mensaje_chat', (data) => {
      if (this.audioOn && (data.socket_id !== this.socket.id)) {
        let audio: HTMLAudioElement = new Audio('https://cdn.videvo.net/videvo_files/audio/premium/audio0303/watermarked/_Soundstorm%206_Tones-AlertDing-Melodic-H-2_B04-08417_preview.mp3');
        audio.play();
      }

      this.mensajes.push(data)
      this.divMensajes.nativeElement.scrollTop = this.divMensajes.nativeElement.scrollHeight - 30
    })
    this.socket.on('clientes_conectados', num => {
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti();
      this.numParticipantes = num
    })

  }

  onClick() {
    this.data.socket_id = this.socket.id
    console.log(this.data)
    this.socket.emit('mensaje_chat', this.data);
  }
}
