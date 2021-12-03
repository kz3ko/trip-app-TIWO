import {
  Component, OnInit, Output, EventEmitter, Input,
} from '@angular/core';
import {
  FormArray, FormBuilder, FormGroup, Validators,
} from '@angular/forms';

@Component({
  selector: 'app-multi-adder',
  templateUrl: './multi-adder.component.html',
  styleUrls: ['./multi-adder.component.scss'],
})
export class MultiAdderComponent implements OnInit {
  @Input() inputArray: string[];

  @Input() touched = false;

  @Output() changeEvent = new EventEmitter<string[]>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      formArray: this.fb.array([
      ]),
    });
  }

  ngOnInit(): void {
    const newForm = this.fb.group({
      formArray: this.fb.array([
      ]),
    });
    const arrayControl = newForm.controls.formArray as FormArray;
    this.inputArray.forEach((inputValue) => {
      const newGroup = this.fb.control(inputValue, [Validators.required, Validators.maxLength(128)]);
      arrayControl.push(newGroup);
    });

    if (!arrayControl.length) {
      const newGroup = this.fb.control('', [Validators.required, Validators.maxLength(128)]);
      arrayControl.push(newGroup);
    }

    this.form = newForm;
    if (this.touched) {
      this.touchAll();
    }
  }

  addInput = (): void => {
    const newGroup = this.fb.control('', [Validators.required, Validators.maxLength(128)]);
    this.formArray.push(newGroup);
  }

  delInput = (index: number): void => {
    this.formArray.removeAt(index);
    this.change();
  }

  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray;
  }

  touchAll = () => {
    this.formArray.controls.forEach((control) => {
      control.markAsTouched({ onlySelf: true });
    });
  }

  change = () => {
    this.changeEvent.next(this.form.value.formArray.filter((elem) => !!elem));
  }
}
