import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  myDate: string;
  customPickerOptions: any;

  avisos: any[] = [
    {
      "data": "11/09/2019",
      "banheiro": "3",
      "alimentação": "Comeu",
      "agua": "2 copos"
    },
    {
      "data": "11/09/2019",
      "banheiro": "3",
      "alimentação": "Comeu",
      "agua": "2 copos"
    },
    {
      "data": "11/09/2019",
      "banheiro": "3",
      "alimentação": "Comeu",
      "agua": "2 copos"
    }
  ];

  constructor(private datePicker: DatePicker) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }
  }

  showDatepicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText: "Save Date",
      todayText: "Set Today"
    }).then(
      date => {
        this.myDate = date.getDate() + "/" + date.toLocaleString('default', { month: 'long' }) + "/" + date.getFullYear();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}

