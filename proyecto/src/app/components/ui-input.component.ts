import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ui-input',
  template: `
    <ion-input
      [label]="label"
      [labelPlacement]="labelPlacement"
      [type]="type"
      [placeholder]="placeholder"
      [value]="value"
      [disabled]="isDisabled"
      (ionInput)="onInputChange($event)">
    </ion-input>
  `,
  imports: [IonInput, ReactiveFormsModule, FormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true
    }
  ]
})
export class UiInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() labelPlacement: 'start' | 'end' | 'floating' | 'stacked' | 'fixed' = 'floating';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  value: string = '';
  isDisabled: boolean = false;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: any) {
    const validVal = event.detail.value;
    this.value = validVal;
    this.onChange(validVal);
    this.onTouched();
  }
}
