<?php

namespace App\Http\Requests;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user->id === $this->link->user_id;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'short_link' => Str::remove(' ', $this->short_link),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'short_link' => [
                'required',
                'string',
                'max:255',
                Rule::unique('links')->ignore($this->link->id),
            ],
            'full_link' => ['required', 'url', 'max:255'],
        ];
    }
}
