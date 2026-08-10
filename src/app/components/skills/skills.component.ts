import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {SectionComponent} from '../section/section.component';
import {BadgeComponent} from '../badge/badge.component';

interface SkillGroup {
  domainKey: string;
  items: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgForOf, TranslatePipe, SectionComponent, BadgeComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  protected groups: SkillGroup[] = [
    {domainKey: 'backend', items: ['Java', 'Spring Boot', 'PostgreSQL', 'Liquibase', 'FastAPI', 'Python']},
    {domainKey: 'frontend', items: ['Angular', 'Vue', 'React']},
    {domainKey: 'mobile', items: ['Flutter', 'Dart']},
    {domainKey: 'devops', items: ['Docker', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Ansible']},
    {domainKey: 'security', items: ['Spring Security', 'OIDC', 'RBAC', 'MongoDB']}
  ];
}
