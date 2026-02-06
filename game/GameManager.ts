/**
 * GameManager Class
 * Handles the logic layer for financial literacy game actions.
 */

export interface GameState {
    wallet: number;
    bank: number;
    knowledge: number;
    inventory: string[];
    flags: Record<string, boolean>;
    recurringDebt: { amount: number; turns: number }[];
}

export class GameManager {
    /**
     * Logic Layer: Processes action_ids and returns updated state.
     */
    static handleAction(action_id: string, currentState: GameState, payload?: any): GameState {
        const newState = { ...currentState };

        switch (action_id) {
            case 'take_cash':
                newState.wallet += 1000;
                break;

            case 'take_bank':
                newState.bank += 1100;
                break;

            case 'kyc_success':
                newState.knowledge += 20;
                newState.flags['kyc_verified'] = true;
                break;

            case 'stash_home':
                newState.wallet += 2000;
                newState.flags['risk_high'] = true;
                break;

            case 'stash_bank':
                newState.bank += 2000;
                newState.knowledge += 10;
                break;

            case 'buy_emi':
                newState.inventory.push('Phone');
                newState.wallet -= 500;
                // Add to recurring debt: ₹1500 total over 10 turns
                newState.recurringDebt.push({ amount: 1500, turns: 10 });
                break;

            case 'buy_cash':
                newState.inventory.push('Phone');
                newState.wallet -= 6000;
                break;

            case 'pay_repair':
                newState.wallet -= 500;
                break;

            case 'validate_pin':
                const pin = payload?.pin || "";
                if (pin === "123456" || pin === "000000") {
                    newState.wallet -= 500; // Penalty for weak security
                    newState.knowledge -= 10;
                } else {
                    newState.knowledge += 10;
                }
                break;

            case 'lend_money':
                newState.wallet -= 500;
                newState.flags['raju_loan'] = true;
                break;

            case 'decline_lend':
                newState.knowledge += 5;
                break;

            case 'pay_service':
                newState.wallet -= 200;
                break;

            case 'click_scam':
                newState.bank -= 1000;
                break;

            case 'avoid_scam':
                newState.knowledge += 10;
                break;

            case 'visit_jail':
                // Handled by game flow
                break;

            default:
                console.warn(`Action logic for ${action_id} not defined in GameManager.`);
                break;
        }

        return newState;
    }
}
