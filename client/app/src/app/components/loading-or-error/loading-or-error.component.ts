import { NgIfContext } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { LoadingWrapper } from 'src/app/Helpers/LoadingWrapper/LoadingWrapper';

@Component({
  selector: 'app-loading-or-error',
  templateUrl: './loading-or-error.component.html',
  styleUrls: ['./loading-or-error.component.scss']
})
export class LoadingOrErrorComponent
{
  @ViewChild("template") template: TemplateRef<NgIfContext> | null = null;
  /**
   * The loading wrapper that should be used to show the loading/error state
   */
  @Input() loadingWrapper: LoadingWrapper<any> | null = null;
  /**
   * A configurable error message for error cases.
   */
  @Input() errorMessage: string = "A error occured!";
}
