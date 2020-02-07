import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe';

@Injectable()
export class RecipesService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as any;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const recipe = new Recipe();
    recipe.id = 'recipeid';
    recipe.title = 'recipetitle';
    recipe.creationDate = new Date();
    recipe.ingredients = ['bar'];
    return [recipe];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
