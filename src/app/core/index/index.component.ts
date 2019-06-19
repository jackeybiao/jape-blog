import { Component, OnInit } from '@angular/core';

import { JapeCoreService, ArticleList } from '../jape-core.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})

export class IndexComponent implements OnInit {

  articleList: Array<ArticleList>;

  monthList: string[];

  constructor(
    private japeCore: JapeCoreService
  ) { }

  ngOnInit() {
    this.getContents();
  }

  onEnter(value: string) {
    this.articleList = this.japeCore.searchPost(value);
    this.monthList = this.japeCore.getMonth(this.articleList);
  }

  getContents() {
    this.japeCore.getContents().subscribe(list => {
      list.forEach(element => {
        element.year = element.name.split('-')[0];
        element.month = element.name.split('-')[1];
        element.day = element.name.split('-')[2];
        element.title = element.name.split('-')[4].replace(/.md/, '');
        element.lock = (element.name.split('-')[5] && element.name.split('-')[5].replace(/.md/, '') === 'lock') ? true : false;
      });
      const listMid = list.filter(ele => ele.lock === false);
      this.articleList = listMid;
      this.japeCore.setArticleList(listMid);
      this.monthList = this.japeCore.getMonth(listMid);
    });
  }
}

