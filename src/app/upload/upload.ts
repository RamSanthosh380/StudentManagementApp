import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.html',
})
export class UploadComponent {
  selectedFile: File | null = null;
  response: any;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.selectedFile = fileInput?.files?.[0] || null;
  }

  onUpload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('https://localhost:7075/api/FileUpload/upload', formData)
      .subscribe({
        next: (res) => this.response = res,
        error: (err) => console.error('Upload failed:', err)
      });
  }
}
