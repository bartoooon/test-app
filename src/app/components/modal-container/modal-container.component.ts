import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  Type,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-container',
  standalone: false,

  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
})
export class ModalContainerComponent implements OnInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dynamicContent!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  constructor(
    private dialogRef: MatDialogRef<ModalContainerComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; component: Type<any>; inputs?: any }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.component) {
      const factory = this.resolver.resolveComponentFactory(
        this.data.component
      );
      this.componentRef = this.dynamicContent.createComponent(factory);

      // Passa gli input al componente dinamico, se definiti
      if (this.data.inputs) {
        Object.keys(this.data.inputs).forEach((key) => {
          this.componentRef.instance[key] = this.data.inputs[key];
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
