import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonDatetime } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ui-datetime',
  template: `
    <ion-datetime
      [presentation]="presentation"
      [value]="value"
      [disabled]="isDisabled"
      [isDateEnabled]="isDateEnabled"
      [firstDayOfWeek]="firstDayOfWeek"
      [locale]="locale"
      [min]="min"
      [max]="max"
      [dayValues]="dayValues"
      [monthValues]="monthValues"
      [yearValues]="yearValues"
      [hourValues]="hourValues"
      [minuteValues]="minuteValues"
      [showDefaultButtons]="showDefaultButtons"
      [showClearButton]="showClearButton"
      [cancelText]="cancelText"
      [doneText]="doneText"
      [clearText]="clearText"
      [readonly]="readonly"
      [multiple]="multiple"
      [color]="color"
      [preferWheel]="preferWheel"
      [size]="size"
      [hourCycle]="hourCycle"
      [title]="title"
      (ionChange)="onDatetimeChange($event)">
    </ion-datetime>
  `,
  imports: [IonDatetime, ReactiveFormsModule, FormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiDatetimeComponent),
      multi: true
    }
  ]
})
export class UiDatetimeComponent implements ControlValueAccessor {
  @Input() presentation: 'date' | 'time' | 'date-time' | 'month' | 'year' | 'month-year' | 'time-date' = 'date-time';
  @Input() isDateEnabled?: (dateIsoString: string) => boolean;
  @Input() firstDayOfWeek: number = 0;
  
  @Input() locale: string = 'es-ES'; // Default to Spanish as app seems to be in Spanish
  @Input() min?: string;
  @Input() max?: string;
  
  @Input() dayValues?: number[] | string;
  @Input() monthValues?: number[] | string;
  @Input() yearValues?: number[] | string;
  @Input() hourValues?: number[] | string;
  @Input() minuteValues?: number[] | string;
  
  @Input() showDefaultButtons: boolean = false;
  @Input() showClearButton: boolean = false;
  
  @Input() cancelText: string = 'Cancelar';
  @Input() doneText: string = 'Aceptar';
  @Input() clearText: string = 'Borrar';
  
  @Input() readonly: boolean = false;
  @Input() multiple: boolean = false;
  @Input() color: string = 'primary';
  
  @Input() preferWheel: boolean = false;
  @Input() size: 'cover' | 'fixed' = 'fixed';
  @Input() hourCycle: 'h12' | 'h23' = 'h23';
  @Input() title: string = '';
  
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

  onDatetimeChange(event: any) {
    const validVal = event.detail.value;
    this.value = validVal;
    this.onChange(validVal);
    this.onTouched();
  }
}
