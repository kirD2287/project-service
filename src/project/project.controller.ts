import {
    Controller,
    Delete,
    Get,
    Param,
    UseGuards,
    Request,
    Body,
    Post,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/project.dto'
import { EventPattern, Payload } from '@nestjs/microservices'


@ApiTags('Проекты')
@Controller('/project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}
    @ApiOperation({ summary: 'Получение списка проектов' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()

    @Get()
    async getProjects(@Request() req) {
        const projects = await this.projectService.getProjects(req)
        return projects
    }

    @ApiOperation({ summary: 'Получение проекта' })
    @ApiResponse({ status: 200 })
    @ApiParam({
        name: 'projectId',
        description: 'Project ID',
        required: true,
        type: Number,
    })
    @ApiBearerAuth()
    
    @Get('/:projectId')
    async getProject(@Request() req, @Param('projectId') projectId: number) {
        const project = await this.projectService.getProject(
            req,
            Number(projectId)
        )
        return project
    }

    @ApiOperation({ summary: 'Создание проекта' })
    @ApiResponse({ status: 200, type: CreateProjectDto })
    @ApiBearerAuth()
    
    @Post()
    async createProject(@Request() req, @Body() dto: CreateProjectDto) {
        const project = await this.projectService.createProject(req, dto)
        return project
    }

    @ApiOperation({ summary: 'Удаление проекта' })
    @ApiResponse({ status: 200 })
    @ApiParam({
        name: 'projectId',
        description: 'Project ID',
        required: true,
        type: Number,
    })
    @ApiBearerAuth()
   
    @Delete('/:projectId')
    async deleteProject(@Request() req, @Param('projectId') projectId: number) {
        const project = await this.projectService.deleteProject(
            req,
            Number(projectId)
        )
        return project
    }

    
  }

