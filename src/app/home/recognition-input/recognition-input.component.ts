import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
import { ModalService } from "../../services/modal.service";
import { Recognition } from "../../model/recognition";
import { RecognitionsService } from "../../services/recognitions.service";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Employee } from "src/app/model/employee-search";
import { Tag } from "src/app/model/hashtag";
import { EmployeeService } from "src/app/services/employee.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-recognition-input",
  templateUrl: "./recognition-input.component.html",
  styleUrls: ["./recognition-input.component.scss"],
})
export class RecognitionInputComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  private searchTerms = new Subject<string>();
  employeeName = "";
  employeeUsername = "";
  givenPoints!: number;

  pointsToGive = 0;
  hashtag = false;
  isEmojiPickerVisible = false;
  recognizeYourself = false;
  disableInput = false;
  showEdit = false;

  recognition!: Recognition;
  cursorPos = 0;

  tags: Tag[] = [];

  @ViewChild("recognitionForm") form!: NgControl;
  @ViewChild("recognitionText") textArea!: ElementRef<HTMLElement>;

  displayNames = true;
  nameSelected = false;
  checkbox = false;

  constructor(
    private modalService: ModalService,
    private recognitionsService: RecognitionsService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.recognition = {
      personFrom: "",
      personTo: "",
      points: 0,
      text: "",
      private: false,
      created_at: "",
      content: "",
      user_from_name: "",
      user_to_name: "",
    };

    this.employeeService.employee.subscribe({
      next: (data) => {
        this.recognition.personFrom = data.username;
      },
    });

    this.recognitionsService.getHashtags().subscribe();

    this.employees$ = this.searchTerms.pipe(
      // wait 500ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) =>
        this.recognitionsService.searchEmployees(term)
      )
    );
  }

  public addEmoji(event: any): void {
    this.recognition.text = `${this.recognition.text} ${event.emoji.native} `;
    this.isEmojiPickerVisible = false;
  }

  toggleEmojiPopup(event: any): void {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
    event.stopPropagation();
  }

  openModal(id: string): void {
    this.displayNames = true;
    this.pointsToGive = this.employeeService.pointsToGive;
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  onKeyDown(event: any): void {
    this.hashtag = false;
    if (event.key === "#") {
      this.tags = this.recognitionsService.returnTags();
      this.hashtag = true;
    }
  }

  getCursorPosition(input: any): void {
    if (input.selectionStart || input.selectionStart == "0") {
      this.cursorPos = input.selectionStart;
    }
  }

  submitRecognition(): void {
    this.recognition.private = this.checkbox;
    this.recognitionsService.addRecognition(this.recognition).subscribe();
    this.recognition.text = "";
    this.recognition.private = false;
    this.employeeService.getUserPortfolio().subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  onPersonConfirm(): void {
    this.recognition.personTo = this.employeeUsername;
    this.closeModal("add-colleague");
    this.nameSelected = false;
    this.disableInput = false;
  }

  onPointsConfirm(): void {
    this.recognition.points = this.givenPoints;
    this.closeModal("add-points");
    this.triggerClick();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  addName(employee: Employee): void {
    this.employeeName = employee.name;
    this.employeeUsername = employee.username;
    this.displayNames = false;
    this.disableInput = true;
    this.showEdit = true;
    if (this.recognition.personFrom === this.employeeUsername) {
      this.recognizeYourself = true;
      this.nameSelected = false;
    } else {
      this.recognizeYourself = false;
      this.nameSelected = true;
    }
  }

  addTag(tag: Tag): void {
    this.recognition.text = `${this.recognition.text}${tag.name}`;
    this.hashtag = false;
    this.triggerClick();
  }

  showEmployees() {
    this.displayNames = true;
    if (this.recognizeYourself) {
      this.employeeName = "";
      this.recognizeYourself = false;
    }
  }

  triggerClick() {
    let el: HTMLElement = this.textArea.nativeElement;
    el.click();
  }

  enableInput() {
    this.disableInput = false;
    this.showEdit = false;
    this.nameSelected = false;
    this.recognizeYourself = false;
    this.employeeName = "";
  }
}
