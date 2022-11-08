import { Component, OnInit } from "@angular/core";
import { Recognition } from "../../model/recognition";
import { RecognitionsService } from "../../services/recognitions.service";

@Component({
  selector: "app-recognition-display",
  templateUrl: "./recognition-display.component.html",
  styleUrls: ["./recognition-display.component.scss"],
})
export class RecognitionDisplayComponent implements OnInit {
  recognitions: Recognition[] = [];
  recognitionsToShow: Recognition[] = [];
  recognitionsLength!: number;
  pageIndex = 0;

  constructor(private recognitionsService: RecognitionsService) {}

  ngOnInit(): void {
    this.recognitionsService.getRecognitionsCount().subscribe((number) => {
      this.recognitionsLength = number;
    });

    this.recognitionsService.getPaginationRecognitions(0).subscribe((data) => {
      data.map((recognition) => {
        let year = recognition.created_at.substring(0, 4);
        let month = recognition.created_at.substring(5, 7);
        let day = recognition.created_at.substring(8, 10);
        recognition.created_at = day + "/" + month + "/" + year;
        return recognition;
      });
      this.recognitionsToShow = data;
    });

    setInterval(() => {
      this.recognitionsService.getRecognitionsCount().subscribe((number) => {
        this.recognitionsLength = number;
      });

      this.recognitionsService
        .getPaginationRecognitions(this.pageIndex)
        .subscribe((data) => {
          data.map((recognition) => {
            let year = recognition.created_at.substring(0, 4);
            let month = recognition.created_at.substring(5, 7);
            let day = recognition.created_at.substring(8, 10);
            recognition.created_at = day + "/" + month + "/" + year;
            return recognition;
          });
          this.recognitionsToShow = data;
        });
    }, 5000);
  }

  onPageChange($event: any) {
    this.pageIndex = $event.pageIndex;
    this.recognitionsService
      .getPaginationRecognitions($event.pageIndex)
      .subscribe((data) => {
        data.map((recognition) => {
          let year = recognition.created_at.substring(0, 4);
          let month = recognition.created_at.substring(5, 7);
          let day = recognition.created_at.substring(8, 10);
          recognition.created_at = day + "/" + month + "/" + year;
          return recognition;
        });
        this.recognitionsToShow = data;
      });
  }
}
