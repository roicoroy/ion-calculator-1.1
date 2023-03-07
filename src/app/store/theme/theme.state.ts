import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TutorialActions } from '../tutorial/tutorial.action';
import { TutorialStateModel } from '../tutorial/tutorial.state';
import { ThemeActions } from './theme.action';

export class ThemeStateModel {
    isDarkMode: boolean;
}

@State<ThemeStateModel>({
    name: 'theme',
    defaults: {
        isDarkMode: false
    }
})
@Injectable()
export class ThemeState {


    @Selector()
    static getPointsList(state: ThemeStateModel): boolean {
        return state.isDarkMode;
    }

    @Action(ThemeActions.SetDarkMode)
    setTutorialComplete(ctx: StateContext<ThemeStateModel>, { payload }: ThemeActions.SetDarkMode) {
        const state = ctx.getState();
        return ctx.patchState({
            isDarkMode: payload
        });
    }
}
