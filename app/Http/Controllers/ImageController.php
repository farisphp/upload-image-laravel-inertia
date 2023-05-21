<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ImageRequest;
use App\Jobs\UploadImageJob;

class ImageController extends Controller
{
    public function store(ImageRequest $request)
    {
        UploadImageJob::dispatchSync($request);

        return back();
    }
}