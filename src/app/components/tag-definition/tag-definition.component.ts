import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-definition',
  templateUrl: './tag-definition.component.html',
  styleUrls: ['./tag-definition.component.css']
})
export class TagDefinitionComponent implements OnInit {
  public tagsFirst: any[];
  public tagsSecond: any[];

  constructor(
    private service: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setTags();
  }

  setTags() {
    this.tagsFirst = [
      {tag: 'CC', description: 'Coordinating conjunction', example: 'and'},
      {tag: 'CD', description: 'Cardinal number', example: '1, third'},
      {tag: 'DT', description: 'Determiner', example: 'the'},
      {tag: 'EX', description: 'Existential there', example: 'there is'},
      {tag: 'FW', description: 'Foreign word', example: 'les'},
      {tag: 'IN', description: 'Preposition or subordinating conjunction', example: 'in, of, like'},
      {tag: 'JJ', description: 'Adjective', example: 'big'},
      {tag: 'JJR', description: 'Adjective, comparative', example: 'bigger'},
      {tag: 'JJS', description: 'Adjective, superlative', example: 'biggest'},
      {tag: 'LS', description: 'List item marker', example: '1)'},
      {tag: 'MD', description: 'Modal', example: 'could, will'},
      {tag: 'NN', description: 'Noun, singular or mass', example: 'desk'},
      {tag: 'NNS', description: 'Noun, plural', example: 'desks'},
      {tag: 'NNP', description: 'Proper noun, singular', example: 'Harrison'},
      {tag: 'NNPS', description: 'Proper noun, plural', example: 'Americans'},
      {tag: 'PDT', description: 'Predeterminer', example: 'all the kids'},
      {tag: 'POS', description: 'Possessive ending', example: 'parent’s'},
      {tag: 'PRP', description: 'Personal pronoun', example: 'I, he, she'},
      {tag: 'PRP$', description: 'Possessive pronoun', example: 'my, his, hers'}];

    this.tagsSecond = [
      {tag: 'RB', description: 'Adverb', example: 'very, silently'},
      {tag: 'RBR', description: 'Adverb, comparative', example: 'better'},
      {tag: 'RBS', description: 'Adverb, superlative', example: 'best'},
      {tag: 'RP', description: 'Particle', example: 'give up'},
      {tag: 'SYM', description: 'Symbol', example: '/ [ = *'},
      {tag: 'TO', description: 'to', example: 'go ‘to’ the store'},
      {tag: 'UH', description: 'Interjection', example: 'errrrrrrrm'},
      {tag: 'VB', description: 'Verb, base form', example: 'take'},
      {tag: 'VBD', description: 'Verb, past tense', example: 'took'},
      {tag: 'VBG', description: 'Verb, gerund or present participle', example: 'taking'},
      {tag: 'VBN', description: 'Verb, past participle', example: 'taken'},
      {tag: 'VBP', description: 'Verb, non-3rd person singular present', example: 'take'},
      {tag: 'VBZ', description: 'Verb, 3rd person singular present', example: 'takes'},
      {tag: 'WDT', description: 'Wh-determiner', example: 'which'},
      {tag: 'WP', description: 'Wh-pronoun', example: 'what'},
      {tag: 'WP$', description: 'Possessive wh-pronoun', example: 'whose'},
      {tag: 'WRB', description: 'Wh-adverb', example: 'where, when'}];
  }
}
