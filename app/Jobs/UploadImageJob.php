<?php

namespace App\Jobs;

use App\Http\Requests\ImageRequest;
use App\Models\Image;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class UploadImageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(ImageRequest $request): void
    {
        $path = Storage::disk('public')->put('images/' . $request->file('upload_image')->getClientOriginalName(), $request->file('upload_image'));

        Image::create([
            'image_url' => config('app.url') . Storage::url('public/' . $path)
        ]);
    }
}